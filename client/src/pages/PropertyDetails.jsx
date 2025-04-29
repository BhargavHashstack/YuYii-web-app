import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageCarousel from '../components/FutureComponents/ImageCarousel';
import RatingCard from '../components/SelectedStayComponents/RatingCard';
import ExpertStory from '../components/ExpertStory';
import ReviewCard from '../components/ReviewCard';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/property-api/property/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching property:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Property Video */}
      <div className="mb-6">
        <video className="w-full h-96 rounded-lg" controls>
          <source src={property.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Property Name & Details */}
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-lg text-gray-600 mb-2">{property.description}</p>
      <p className="text-gray-500">
        <strong>Location:</strong> {property.location}
      </p>
      <p className="text-gray-500">
        <strong>Price:</strong> {property.price}
      </p>

      {/* Image Carousel */}
      <ImageCarousel images={property.images} />

      {/* Amenities and Activities */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Amenities</h3>
        <ul>
          {property.amenities.map((amenity, idx) => (
            <li key={idx}>{amenity}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Activities</h3>
        <ul>
          {property.activities.map((activity, idx) => (
            <li key={idx}>{activity}</li>
          ))}
        </ul>
      </div>

      {/* Ratings */}
      <RatingCard ratings={property.ratings} />

      {/* Expert Story */}
      <ExpertStory story={property.expertStory} />

      {/* Expert Review */}
      <ReviewCard review={property.expert} />
    </div>
  );
};

export default PropertyDetails;
