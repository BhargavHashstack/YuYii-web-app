import React, { useEffect, useState } from 'react';

const S3ImageThumbnail = ({ destinationTitle, imageName, altText }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const folderName = destinationTitle.toLowerCase().replace(/ /g, '_');
        const prefix     = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;
        const key        = `${prefix}/destination/${folderName}/${imageName}`;

        const response = await fetch(
          `/property-api/destinations/image?key=${encodeURIComponent(key)}`
        );

        if (!response.ok) throw new Error('Failed to fetch image');
        const blob = await response.blob();
        setImageUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error('Error fetching thumbnail:', err);
        setError(err.message);
      }
    };

    fetchImage();
  }, [destinationTitle, imageName]);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <img
      src={imageUrl}
      alt={altText}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
};

export default S3ImageThumbnail;