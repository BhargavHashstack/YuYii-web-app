import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Property from "../models/property.model.js";

export const test = (req, res) => {
  res.json({
    message: "API route is working!",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      avatar,
      gender,
      dateOfBirth,
      preferredLanguage,
      location,
    } = req.body;

    // Check if another user already uses the provided email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail && existingUserByEmail._id.toString() !== req.params.id) {
      return next(errorHandler(400, "Email already exists."));
    }

    // Check if another user already uses the provided phone number
    const existingUserByPhone = await User.findOne({ phone });
    if (existingUserByPhone && existingUserByPhone._id.toString() !== req.params.id) {
      return next(errorHandler(400, "Phone number already exists."));
    }

    // Build updateFields without any password field.
    let updateFields = {
      firstName,
      lastName,
      email,
      phone,
      avatar,
      gender,
      dateOfBirth,
      preferredLanguage,
      location,
    };

    // If phone is an empty string, remove it from the update payload.
    if (updateFields.phone === "") {
      delete updateFields.phone;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found!"));
    }

    // Remove the password from the returned user object.
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      user: rest,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return next(errorHandler(400, `${field} already exists.`));
    }
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User has been deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only view your own listings!"));
  }

  try {
    const listings = await Property.find({ userRef: req.params.id });
    if (!listings.length) {
      return res.status(404).json({
        success: false,
        message: "No listings found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Listings fetched successfully!",
      listings,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByPhone = async (req, res, next) => {
  try {
    const user = await User.findOne({ phone: req.params.phone });

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};
