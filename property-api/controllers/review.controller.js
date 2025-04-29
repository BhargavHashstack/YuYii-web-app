// src/controllers/review.controller.js
import Review from "../models/review.model.js";

// Get all reviews
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    const transformedReviews = reviews.map((review) => {
      let stayName = review.stay_name;
      try {
        stayName = JSON.parse(review.stay_name);
      } catch (e) {
        // If not JSON, leave as string
      }

      let reviewContent = review.review;
      try {
        reviewContent = JSON.parse(review.review);
      } catch (e) {}

      let gallery = review.gallery;
      try {
        gallery = JSON.parse(review.gallery);
      } catch (e) {}

      return {
        id: review.id,
        stay_id: review.stay_id,
        booking_id: review.booking_id,
        stay_name: stayName, // object or string
        checkin: review.checkin,
        review: reviewContent, // object or string
        user_name: review.user_name,
        user_email: review.user_email,
        user_pic: review.user_pic,
        user_location: review.user_location,
        status: review.status, // "Accepted" or "Rejected"
        gallery: gallery,      // array or string
      };
    });
    res.status(200).json({ success: true, data: transformedReviews });
  } catch (error) {
    next(error);
  }
};

// Update status for a single review
export const updateReviewStatus = async (req, res, next) => {
  try {
    const { id } = req.params;   // The numeric "id" field, e.g. 33
    const { status } = req.body; // "Accepted" or "Rejected"
    if (!["Accepted", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    // Attempt to find and update the review with new status
    const updated = await Review.findOneAndUpdate(
      { id: parseInt(id) },       // match "id" in DB
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    // Return the updated document
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
