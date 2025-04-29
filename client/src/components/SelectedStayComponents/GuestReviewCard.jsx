// src/components/SelectedStayComponents/GuestReviewCard.jsx
import React, { useState, useEffect } from "react";
import "./ReviewCard.css";      // your pink colour palette
import "./Experience.css";      // .custom-experience & .head-highlightline
import highlightline from "../../assets/highlightline.png";
import experience from "../../assets/experience.png";

const GuestReviewCard = ({ stayId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("▶️ GuestReviewCard fetch for stayId:", stayId);
        const res = await fetch("/property-api/reviews");
        const { success, data } = await res.json();
        if (!success) return;

        const accepted = data.filter((r) => {
          if (r.status !== "Accepted") return false;
          const num = parseInt(stayId, 10);
          if (!isNaN(num)) return r.stay_id === num;
          return r.stay_name?.name === stayId;
        });

        console.log("✅ accepted reviews:", accepted);
        setReviews(accepted);
      } catch (err) {
        console.error("Error loading reviews:", err);
      }
    };

    fetchReviews();
  }, [stayId]);

  if (!reviews.length) {
    return (
      <p className="p-6 text-center text-gray-500">
        No guest reviews yet
      </p>
    );
  }

  return (
    <div className="space-y-16">
      {reviews.map((rev) => {
        // — parse review
        let revContent = rev.review;
        if (typeof revContent === "string") {
          try {
            revContent = JSON.parse(revContent);
          } catch {
            revContent = { comment: revContent, title: "" };
          }
        }
        const title = revContent.title || "";
        const comment = revContent.comment || "";

        // — parse banners
        let banners = [];
        if (Array.isArray(rev.stay_name.banner)) {
          banners = rev.stay_name.banner;
        } else if (typeof rev.stay_name.banner === "string") {
          try {
            banners = JSON.parse(rev.stay_name.banner);
          } catch {
            banners = [];
          }
        }

        return (
          <div key={rev.id} className="relative pt-20">
            {/* dashed pink divider from your CSS */}
            <img
              src={highlightline}
              alt="divider"
              className="head-highlightline"
            />

            <div className="flex flex-col md:flex-row">
              {/* LEFT: big photo + dots */}
              <div className="md:w-1/3 w-full">
                {banners[0] ? (
                  <img
                    src={banners[0]}
                    alt={rev.stay_name.name}
                    className="w-full h-56 object-cover rounded-md shadow-sm"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-100 rounded-md" />
                )}
                <div className="flex space-x-2 justify-center mt-3">
                  {banners.slice(0, 4).map((_, i) => (
                    <span
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full ${
                        i === 0 ? "bg-pink-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT: icon + title, text, reviewer */}
              <div className="md:w-2/3 w-full pl-0 md:pl-12 pt-8 md:pt-0">
                <div className="custom-experience">
                  <img
                    src={experience}
                    alt="experience icon"
                    className="w-5 h-5 sm:w-8 sm:h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 object-contain"
                  />
                  <h3 className="text-pink-600 text-[10px] sm:text-xs md:text-sm lg:text-lg xl:text-3xl font-satisfy">
                    {title}
                  </h3>
                </div>

                <h4 className="text-xl font-semibold mb-4 mt-4">
                  What do I love about this place?
                </h4>
                <p className="text-gray-800 leading-relaxed mb-6">
                  {comment}
                </p>
                <p className="italic text-gray-600 text-lg">
                  — {rev.user_name}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GuestReviewCard;
