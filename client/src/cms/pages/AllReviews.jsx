import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import CmsNavbar from "../CmsComponents/CmsNavbar";    // Adjust import path if needed
import CmsSidebar from "../CmsComponents/CmsSidebar";  // Adjust import path if needed

function AllReviews() {
  const [reviews, setReviews] = useState([]);

  // Fetch all reviews on component mount
  useEffect(() => {
    fetch("/property-api/reviews")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched reviews data:", data); // Debug log
        if (data.success) {
          setReviews(data.data);
        } else {
          console.error("Error in response:", data.message);
        }
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  // Toggle review status => update DB and local state
  const handleToggleStatus = (id) => {
    const currentReview = reviews.find((r) => r.id === id);
    if (!currentReview) return;

    const newStatus =
      currentReview.status === "Accepted" ? "Rejected" : "Accepted";

    // Update the DB
    fetch(`/property-api/reviews/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // If DB update was successful, update local state
          setReviews((prev) =>
            prev.map((review) =>
              review.id === id ? { ...review, status: newStatus } : review
            )
          );
        } else {
          console.error("Failed to update review status:", data.message);
        }
      })
      .catch((err) => console.error("Error updating review status:", err));
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className="flex min-h-screen bg-white overflow-x-hidden">
      {/* Sidebar */}
      <CmsSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <CmsNavbar onLogout={handleLogout} />

        {/* Center and limit width */}
        <main className="p-4 w-full max-w-screen-lg mx-auto">
          {/* Page Header */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">All Reviews</h1>
            <p className="text-sm text-gray-500">
              Manage Reviews &gt; All Reviews
            </p>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length === 0 && (
              <p className="text-gray-500">No reviews available.</p>
            )}
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded shadow p-4 flex space-x-4"
              >
                {/* Left Column: Avatar (or user_pic if you have actual images) */}
                <div className="flex-shrink-0">
                  {review.user_pic && review.user_pic !== "default-user.png" ? (
                    <img
                      src={`/assets/images/${review.user_pic}`}
                      alt="User"
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="text-6xl text-gray-400" />
                  )}
                </div>

                {/* Right Column: Review details */}
                <div className="flex-1">
                  {/* Top row: user name, stay info, and status */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-700">
                        {review.user_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Stayed at{" "}
                        {typeof review.stay_name === "object"
                          ? review.stay_name.name
                          : review.stay_name}{" "}
                        on {new Date(review.checkin).toDateString()}
                      </p>
                    </div>

                    {review.status === "Accepted" ? (
                      <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-semibold">
                        Accepted
                      </span>
                    ) : (
                      <span className="text-red-600 bg-red-100 px-2 py-1 rounded text-xs font-semibold">
                        Rejected
                      </span>
                    )}
                  </div>

                  {/* The actual review text/comment */}
                  {/* Use whitespace-pre-wrap + break-words to prevent overflow */}
                  <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap break-words">
                    {typeof review.review === "object"
                      ? review.review.comment
                      : review.review}
                  </p>

                  {/* Gallery images */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Array.isArray(review.gallery) &&
                      review.gallery.map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={`/assets/images/${imgUrl}`}
                          alt="Review"
                          className="w-24 h-16 object-cover rounded"
                        />
                      ))}
                  </div>

                  {/* Accept/Reject button */}
                  <div className="mt-2">
                    {review.status === "Accepted" ? (
                      <button
                        onClick={() => handleToggleStatus(review.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleStatus(review.id)}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllReviews;
