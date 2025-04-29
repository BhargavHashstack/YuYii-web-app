// src/components/SelectedDestinationComponents/S3Image.jsx
import React, { useState, useEffect } from "react";

const S3Image = ({ folder, imageName, alt, className, style, basePath }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [error,    setError]    = useState(null);

  useEffect(() => {
    if (!imageName) return;

    // 1) If basePath is provided (for icons), just use that + imageName
    // 2) Otherwise, build exactly: prefix + '/destination/' + folder + '/' + imageName
    let key;
    if (basePath && !folder) {
      key = `${basePath}/${imageName}`;
    } else if (folder) {
      const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;
      key = `${prefix}/destination/${folder}/${imageName}`;
    } else {
      const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;
      key = `${prefix}/${imageName}`;
    }

    fetch(`/property-api/destinations/image?key=${encodeURIComponent(key)}`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.blob();
      })
      .then(blob => {
        setImageUrl(URL.createObjectURL(blob));
      })
      .catch(err => {
        console.error("S3Image fetch error:", err);
        setError(err.message);
      });
  }, [folder, imageName, basePath]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  if (!imageUrl) {
    return (
      <div className={className} style={style}>
        Loading image…
      </div>
    );
  }
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError("Failed to load image")}
    />
  );
};

export default S3Image;
