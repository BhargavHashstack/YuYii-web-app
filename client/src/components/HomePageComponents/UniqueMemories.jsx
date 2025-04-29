// UniqueMemories.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import location_icon from '../../assets/images/Images/unique_memories/location.png';
import HeadingSection from '../reusable_components/HeadingSection';
import Title from '../reusable_components/Title';
import arrowImg from '../../assets/images/Images/reusable_icons/next-icon.svg';

// AWS S3 imports & presigner
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const UniqueMemories = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(0);
  const [memories, setMemories] = useState([]);
  const [memoryImgUrls, setMemoryImgUrls] = useState([]);

  // Fetch home collection “experiences”
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await fetch('/property-api/home');
        const json = await res.json();
        const doc = Array.isArray(json.data) ? json.data[0] : json.data || json;
        let exps = doc.experiences;
        if (typeof exps === 'string') {
          try { exps = JSON.parse(exps); } catch {}
        }
        setMemories(exps || []);
      } catch (err) {
        console.error('Error fetching home experiences:', err);
      }
    };
    fetchHome();
  }, []);

  // Once memories arrive, generate signed URLs
  useEffect(() => {
    if (!memories.length) return;

    const s3 = new S3Client({
      region: import.meta.env.REACT_APP_AWS_REGION,
      credentials: {
        accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      },
    });

    const fetchAll = async () => {
      const urls = await Promise.all(
        memories.map(async (mem) => {
          const folder = mem.destination.toLowerCase().replace(/ /g, '_');
          const key = `${import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX}/destination/${folder}/${mem.banner}`;
          try {
            const cmd = new GetObjectCommand({
              Bucket: import.meta.env.REACT_APP_AWS_S3_BUCKET,
              Key: key,
            });
            return await getSignedUrl(s3, cmd, { expiresIn: 900 });
          } catch (e) {
            console.error(`Failed signing ${mem.banner}:`, e);
            return `/assets/images/${mem.banner}`;
          }
        })
      );
      setMemoryImgUrls(urls);
    };

    fetchAll();
  }, [memories]);

  // Responsive breakpoint
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % memories.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + memories.length) % memories.length);

  return (
    <div className="px-6 md:px-32 max-w-8xl mt-[50px]">
      {/* Heading */}
      <div className="grid md:grid-cols-2 mb-8">
        <div>
          <HeadingSection text="Yuyiii special" color="black" />
          <Title>
            Create Unique and
            <span className="block">Unforgettable</span>
            <span className="block">Memories</span>
          </Title>
        </div>
        <div className="flex items-center">
          <div className="flex items-start gap-4">
            <img src={location_icon} alt="Location icon" className='w-12 h-12' style={{height: '32px',
                  width: '20px',}}  />
            {memories.length > 0 && (
              <div>
                <h5 className="text-xl font-serif mb-2">
                  {isMobile
                    ? memories[currentSlide].destination
                    : memories[hoveredImage].destination}
                </h5>
                <p className="text-sm mb-2">
                  {isMobile
                    ? memories[currentSlide].description
                    : memories[hoveredImage].description}
                </p>
                <Link
                  to={`/destination/${encodeURIComponent(
                    isMobile
                      ? memories[currentSlide].destination
                      : memories[hoveredImage].destination
                  )}`}
                  className="text-sm underline hover:text-gray-600"
                >
                  Explore more about this destination
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Grid View */}
      {!isMobile && (
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
          {memories.map((mem, idx) => (
            <div key={idx} onMouseEnter={() => setHoveredImage(idx)}>
              <img
                src={memoryImgUrls[idx] || `/assets/images/${mem.banner}`}
                alt={mem.title}
                style={{
                  display: 'block',
                  maxWidth: '300px',
                  maxHeight: '400px',
                  height: '400px',
                  width: 'auto',
                  transform: hoveredImage === idx ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              />
              <div
                className="bg-black relative bottom-22 z-8 text-white p-4"
                style={{
                  transform: hoveredImage === idx ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <p className="xl:text-lg lg:text-sm text-xs font-serif mb-2">
                  {mem.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Carousel View */}
      {isMobile && memories.length > 0 && (
        <div className="relative sm:px-6">
          <div className="overflow-hidden rounded-lg">
            <img
              src={memoryImgUrls[currentSlide] || `/assets/images/${memories[currentSlide].banner}`}
              alt={memories[currentSlide].title}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Prev / Next */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-transparent border-none"
          >
            <img className="w-[28px] h-[28px]" src={arrowImg} alt="Previous" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-transparent border-none"
          >
            <img className="w-[28px] h-[28px] rotate-180" src={arrowImg} alt="Next" />
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {memories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === idx ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UniqueMemories;
