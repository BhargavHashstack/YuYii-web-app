// src/components/S3ImageComponent.jsx
import React, { useState, useEffect } from 'react';

const S3ImageComponent = ({ destinationTitle, imageName, altText }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (!destinationTitle || !imageName) {
      setError('Missing props');
      setLoading(false);
      return;
    }

    const folder = destinationTitle.toLowerCase().replace(/ /g, '_');
    const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;
    const key    = `${prefix}/destination/${folder}/${imageName}`;
    const endpoint = `/property-api/destinations/image?key=${encodeURIComponent(key)}`;

    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.blob();
      })
      .then(blob => {
        setImageUrl(URL.createObjectURL(blob));
      })
      .catch(err => {
        console.error('S3ImageComponent error:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [destinationTitle, imageName]);

  if (loading) return <div>Loading image…</div>;
  if (error)   return <div className="text-red-500">Error: {error}</div>;

  return (
    <img
      src={imageUrl}
      alt={altText}
      className="w-full h-full object-cover transition-opacity duration-300"
      onError={() => setError('Failed to load image')}
    />
  );
};

export default S3ImageComponent;
