// src/components/NextTravelPlan/NextTravelPlan.jsx

import React, { useState, useEffect, useRef } from 'react';
import arrowImg from '../../assets/images/Images/reusable_icons/next-icon.svg';
import HeadingSection from "../reusable_components/HeadingSection";
import Title from "../reusable_components/Title";

// AWS SDK + presigner
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// init S3 once
const s3 = new S3Client({
  region: import.meta.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

const NextTravelPlan = () => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [tripTypes, setTripTypes] = useState([]);

  useEffect(() => {
    const fetchTripTypes = async () => {
      try {
        // 1) home API → array of names
        const homeRes  = await fetch("/property-api/home");
        const homeJson = await homeRes.json();
        if (!homeJson.success) throw new Error("Home API error");
        const homeTripTypes = Array.isArray(homeJson.data.trip_types)
          ? homeJson.data.trip_types
          : [];

        // 2) triptypes API → either direct array or { data: [...] }
        const tripRes  = await fetch("/property-api/triptypes");
        const tripJson = await tripRes.json();
        const allTripTypes = Array.isArray(tripJson)
          ? tripJson
          : Array.isArray(tripJson.data)
            ? tripJson.data
            : [];

        // 3) for each name, find its banner and presign
        const signedList = await Promise.all(
          homeTripTypes.map(async (name) => {
            const found = allTripTypes.find(
              (t) => t.name.toLowerCase() === name.toLowerCase()
            );

            // default fallback
            let bannerUrl = "/assets/images/default.jpg";

            if (found?.banner) {
              // try both exact and lower‑case filename
              const variants = [
                found.banner,
                found.banner.toLowerCase(),
              ];

              for (const fn of variants) {
                const key = `${import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX}/trip_type/${fn}`;
                try {
                  const cmd = new GetObjectCommand({
                    Bucket: import.meta.env.REACT_APP_AWS_S3_BUCKET,
                    Key: key,
                  });
                  bannerUrl = await getSignedUrl(s3, cmd, { expiresIn: 900 });
                  break;         // success! stop trying variants
                } catch (err) {
                  // console.warn(`failed presign for ${key}`);
                }
              }
            }

            return { name, banner: bannerUrl };
          })
        );

        setTripTypes(signedList);
      } catch (err) {
        console.error("Error fetching trip types:", err);
      }
    };

    fetchTripTypes();
  }, []);

  const handleScroll = (dir) => {
    const cont = containerRef.current;
    if (!cont) return;
    const delta = 303;
    setScrollPosition(pos =>
      dir === "next"
        ? Math.min(pos + delta, cont.scrollWidth - cont.clientWidth)
        : Math.max(pos - delta, 0)
    );
  };

  return (
    <>
      {/* Heading */}
      <div className="container mt-[30px] px-6 md:px-32 max-w-8xl">
        <HeadingSection text="Categorised experiences for you" color="black" />
        <Title>
          What's your next travel <span style={{display:"block"}}>plan?</span>
        </Title>
      </div>

      {/* Carousel */}
      <div className="w-full bg-[#fff8fa] mt-[54px] overflow-hidden relative sm:px-32">
        <div className="container mx-auto flex items-center justify-between">
          <button onClick={() => handleScroll("prev")} className="p-2">
            <img src={arrowImg} alt="prev" className="w-7 h-7" />
          </button>

          <div className="flex-1 overflow-hidden">
            <div
              ref={containerRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {tripTypes.map((t, i) => (
                <a
                  key={i}
                  href={`Destination?t=${encodeURIComponent(t.name)}`}
                  className="block w-[280px] h-[500px] mx-[11px] shrink-0"
                >
                  <div className="w-full h-full shadow-lg hover:scale-[1.03] transition-transform">
                    <img
                      src={t.banner}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <button onClick={() => handleScroll("next")} className="p-2">
            <img src={arrowImg} alt="next" className="w-7 h-7 rotate-180" />
          </button>
        </div>
      </div>
    </>
  );
};

export default NextTravelPlan;
