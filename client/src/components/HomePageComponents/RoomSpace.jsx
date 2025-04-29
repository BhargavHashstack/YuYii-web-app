import React, { useState, useEffect } from "react";
import HeadingSection from "../reusable_components/HeadingSection";
import Title from "../reusable_components/Title";
// AWS S3 imports for signed URLs
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const RoomSpace = () => {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(0);

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        // 1) Fetch home configuration
        const homeRes = await fetch("/property-api/home");
        const homeJson = await homeRes.json();
        if (!homeJson.success) throw new Error("Failed to load home data");
        const homeRooms = homeJson.data.rooms; // [{ stay, room }, ...]

        // 2) Prepare S3 client
        const region = import.meta.env.REACT_APP_AWS_REGION;
        const accessKey = import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID;
        const secretKey = import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
        const bucket = import.meta.env.REACT_APP_AWS_S3_BUCKET;
        const prefix = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;

        const s3 = new S3Client({
          region,
          credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
        });

        // 3) Enrich each entry with data from selectedstay and signed image URL
        const enriched = await Promise.all(
          homeRooms.map(async ({ stay, room }) => {
            // Fetch selected stay by its stayId
            const stayRes = await fetch(
              `/property-api/selectedstay/${encodeURIComponent(stay)}`
            );
            const stayJson = await stayRes.json();

            // Find the matching room object in that stay
            const roomObj = stayJson.room.find(
              (r) => r.id === room || r.name === room
            );

            // Compute S3 presigned URL for the first room image
            let imageUrl = "";
            const fileName = roomObj.images?.[0];
            if (fileName) {
              const folder = stayJson.destination
                .toLowerCase()
                .replace(/ /g, "_");
              const key = `${prefix}/destination/${folder}/${fileName}`;
              const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
              imageUrl = await getSignedUrl(s3, cmd, { expiresIn: 900 });
            }

            return {
              id: roomObj.id,
              title: roomObj.id,
              rate: roomObj.price?.toString() || "",
              destination: stayJson.destination,
              state: stayJson.state,
              imageUrl,
            };
          })
        );

        setRooms(enriched);
      } catch (err) {
        console.error("Error fetching rooms data:", err);
      }
    };

    fetchRoomsData();
  }, []);

  // Show loading state
  if (rooms.length === 0) {
    return (
      <div className="px-6 sm:px-6 md:px-32 max-w-8xl">
        <p className="text-center py-20">Loading rooms…</p>
      </div>
    );
  }

  // Render the room selector and image display
  return (
    <div className="px-6 sm:px-6 md:px-32 max-w-8xl">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-2 xl:gap-4">

        {/* Left Column: Room list */}
        <div className="w-full lg:4/12 xl:w-5/12">
          <div className="text-left mb-9">
            <HeadingSection text="Hidden Jewels" color="black" />
            <Title text="Your room, your space" />
          </div>
          <div className="space-y-4 2xl:space-y-6">
            {rooms.map((room, idx) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(idx)}
                className={`w-full text-left transition-all duration-300 p-3 sm:p-4 ${
                  idx === activeRoom
                    ? "bg-gray-100 border-r-4 border-r-gray-800"
                    : "bg-white border-r-4 border-r-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex gap-4 items-start">
                  <img
                    className="md:w-28 h-20 sm:w-36 sm:h-24 object-cover rounded"
                    src={room.imageUrl}
                    alt={room.title}
                  />
                  <div className="flex-1">
                    <h5 className="font-bold text-sm xl:text-base mb-2">
                      {room.title}
                    </h5>
                    <div className="flex items-baseline gap-0 text-sm">
                      <span className="text-xs xl:text-sm text-[#000000]">
                        Starting from
                      </span>
                      <span className="font-serif text-xs xl:text-base ml-1 sm:ml-2 md:ml-2 xl:ml-4">
                        ₹
                      </span>
                      <strong className="flex items-center text-xs xl:text-sm ">
                        {room.rate}
                        <span className="text-xs xl:text-sm">/Night</span>
                      </strong>
                    </div>
                    <p className="text-xs sm:text-sm mt-1 xl:mt-3 text-[#000000]">
                      {room.destination}, {room.state}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active room image */}
        <div className="w-full lg:8/12 xl:w-7/12">
          <div className="relative w-full h-96 lg:h-full lg:h-[420px] xl:h-[432px] lg:mt-24">
            {rooms.map((room, idx) => (
              <div
                key={room.id}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  idx === activeRoom
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={room.imageUrl}
                  alt={room.title}
                />
                <a
                  href={`Stays/${encodeURIComponent(room.id)}`}
                  className="absolute bottom-4 right-4 px-4 py-2 text-sm text-white bg-black/20 hover:bg-black/30 border border-white rounded-md transition-colors duration-300"
                >
                  View property
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoomSpace;