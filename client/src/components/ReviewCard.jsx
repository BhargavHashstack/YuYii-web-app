import React, { useState, useEffect } from "react";
import { GoStarFill } from "react-icons/go";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


// Load AWS config from environment variables
const REGION            = import.meta.env.REACT_APP_AWS_REGION;
const ACCESS_KEY_ID     = import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const S3_URI            = import.meta.env.REACT_APP_S3_URI || "";
const uriParts          = S3_URI.split("/");
const S3_BUCKET         = import.meta.env.REACT_APP_S3_BUCKET || uriParts[2];
const S3_KEY_PREFIX     = import.meta.env.REACT_APP_S3_KEY_PREFIX || uriParts.slice(3).join("/");


const ReviewCard = ({ 
  image, 
  reviewerName, 
  review, 
  improvement, 
  tip, 
  suitable,
  location,
  reviewerdesignation,
  highlight, 
  experience, 
  ratings,
  propertyImage, 
  socialLinks,
  destination // new prop needed for generating the S3 folder name
}) => {
  // States to hold signed URLs for review image and property images
  const [reviewImageUrl, setReviewImageUrl] = useState(image);
  const [propertyImageUrls, setPropertyImageUrls] = useState(propertyImage);

  // Function to generate a signed URL for a given image reference
  const fetchSignedUrl = async (imgRef) => {
    try {
      const s3Client = new S3Client({
        region: REGION,
        credentials: {
          accessKeyId: ACCESS_KEY_ID,
          secretAccessKey: SECRET_ACCESS_KEY,
        },
      });
      const folderName = destination.toLowerCase().replace(/ /g, "_");
      const keyPath = S3_KEY_PREFIX
        ? `${S3_KEY_PREFIX}/destination/${folderName}/${imgRef}`
        : `destination/${folderName}/${imgRef}`;
      const command = new GetObjectCommand({
        Bucket: S3_BUCKET,
        Key: keyPath,
      });
      const url = await getSignedUrl(s3Client, command, { expiresIn: 900 });
      return url;
    } catch (err) {
      console.error("Error fetching signed URL:", err);
      return imgRef;
    }
  };

  // Fetch signed URL for the review image
  useEffect(() => {
    if (destination && image) {
      const fetchReviewImage = async () => {
        const url = await fetchSignedUrl(image);
        setReviewImageUrl(url);
      };
      fetchReviewImage();
    }
  }, [destination, image]);

  // Fetch property images URLs
  useEffect(() => {
    if (destination && Array.isArray(propertyImage) && propertyImage.length > 0) {
      (async () => {
        const urls = await Promise.all(
          propertyImage.map((imgRef) => fetchSignedUrl(imgRef))
        );
        setPropertyImageUrls(urls);
      })();
    }
  }, [destination, propertyImage]);

  const renderStars = (count) =>
    [...Array(5)].map((_, index) => (
      <span key={index} className={index < count ? "text-pink-500" : "text-gray-300"}>
        ★
      </span>
    ));
 

  return (
    <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white px-6 lg:px-16">
      
      {/* Column 1: Expert Reviews */}
      <div className="lg:mt-8">
        <p className="sm:text-lg lg:text-xl font-[500]">Expert Reviews</p>
        <div className="flex items-center mb-4">
          <GoStarFill className="mr-1" />
          <span className="text-lg font-bold">5.0</span>
          <span className="text-gray-500 ml-2">6 reviews</span>
        </div>
        <div className="border-t-[16px] border-b-[16px] border-[#FEF6FA] bg-[#FEF6FA] p-4 mt-8">
          <div className="relative">
            <img src={reviewImageUrl} alt={reviewerName} className="w-full h-60 object-cover rounded-lg" />
            <h2 className="text-[#DE1587] font-[400] font-Merriweather mt-2">{reviewerName}</h2>
            <p className="text-black text-sm">{reviewerdesignation}</p>
            
            <div className="flex space-x-2 mt-2">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.url} className="text-[#505459] text-xl hover:text-pink-700">
                  <link.icon />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="border-[16px] border-[#FEF6FA] p-4">
            <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.6471 30.2355L8.56456 36.0625L10.681 23.7206L1.71484 14.9808L14.1058 13.1809L19.6471 1.95215L25.1883 13.1809L37.5793 14.9808L28.6132 23.7206L30.7296 36.0625L19.6471 30.2355Z" stroke="#DE1587" strokeWidth="2.28552" strokeLinejoin="round"/>
            </svg>
            <p className="text-[#DE1587] text-xl mt-2 font-[400]">Highlight of the Property</p>
            <p className="text-black text-sm mt-2">{highlight}</p>
            <div className="md:mb-[170px]">

          </div>
          </div>
          
        </div>
      </div>

      {/* Column 2: Experience, Improvement & Secondary Property Image */}
      <div className="space-y-6 mt-20">
        <div className="border-[16px] border-[#FEF6FA] p-4">
          <svg width="44" height="38" viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.61 15.3033V0.436523H23.6864H21.209H11.3128V15.3033H1.32031V37.5624H43.6025V15.3033H33.61ZM11.3128 35.0983H3.79779V17.7674H11.3128V35.0983ZM23.7001 35.0983H21.2227V32.6341H23.7001V35.0983ZM19.8502 30.17C20.3148 29.1996 21.3107 28.5273 22.4614 28.5273C23.6121 28.5273 24.608 29.1996 25.0727 30.17H19.8502ZM31.1326 35.0983H26.1776V32.6341V30.2751H18.7452V35.0983H13.7903V2.90063H31.1326V35.0983ZM41.125 35.0983H33.61V17.7674H41.125V35.0983Z" fill="#DE1587" stroke="#F6F6F6" strokeWidth="0.685657"/>
          </svg>
          <p className="text-[#DE1587] text-xl mt-2 font-[400]">Experience at the Property</p>
          <p className="text-black text-sm mt-2">{experience}</p>
          <p className="text-[#DE1587] text-poppins font-[400] text-sm underline mt-1">Read more</p>
          <div className="md:mb-[30px]">

</div>
        </div>

        <div className="border-[16px] border-[#FEF6FA] p-4">
          <svg width="44" height="43" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8097 17.0618C22.6973 17.0618 23.4167 17.7812 23.4167 18.6689C23.4167 19.5565 22.6973 20.2759 21.8097 20.2759C20.9221 20.2759 20.2027 19.5565 20.2027 18.6689C20.2027 17.7812 20.9221 17.0618 21.8097 17.0618ZM27.4342 18.6689C27.4342 19.5565 28.1536 20.2759 29.0412 20.2759C29.9288 20.2759 30.6482 19.5565 30.6482 18.6689C30.6482 17.7812 29.9288 17.0618 29.0412 17.0618C28.1536 17.0618 27.4342 17.7812 27.4342 18.6689ZM12.9711 18.6689C12.9711 19.5565 13.6905 20.2759 14.5781 20.2759C15.4658 20.2759 16.1851 19.5565 16.1851 18.6689C16.1851 17.7812 15.4658 17.0618 14.5781 17.0618C13.6905 17.0618 12.9711 17.7812 12.9711 18.6689ZM41.0467 33.7396C42.9274 35.6203 42.9274 38.6786 41.0476 40.5584C40.1079 41.4981 38.8732 41.9683 37.6387 41.9683C36.4043 41.9683 35.1695 41.4981 34.2298 40.5584L25.4082 31.7566C25.2208 31.5695 25.0827 31.3394 25.0058 31.0858L23.0843 24.7604C22.9139 24.1995 23.0623 23.5906 23.4716 23.171C23.8809 22.7517 24.486 22.5885 25.051 22.7448L31.5371 24.5413C31.8042 24.6154 32.0475 24.757 32.2436 24.9528L41.0467 33.7396ZM27.9637 29.766L33.9169 35.706L36.1899 33.4329L30.2719 27.5262L27.0089 26.6223L27.9637 29.766ZM38.7749 36.0133L38.4648 35.7035L36.1921 37.9762L36.5013 38.2844C37.129 38.9125 38.1484 38.9125 38.7749 38.2857C39.4017 37.6592 39.4017 36.6397 38.7749 36.0133ZM22.7839 34.1326C22.487 34.1454 22.1863 34.152 21.89 34.152C19.3059 34.152 16.8182 33.6709 14.4962 32.722C14.1007 32.5607 13.6569 32.5632 13.2633 32.7292L5.94611 35.818L8.41155 29.9779C8.65261 29.4069 8.54369 28.7478 8.13127 28.2845C5.77819 25.6411 4.53433 22.4783 4.53433 19.1387C4.53433 10.8162 12.3202 4.04507 21.89 4.04507C31.4599 4.04507 39.2457 10.8162 39.2457 19.1387C39.2457 21.1123 38.7611 23.0938 37.8051 25.0275C37.4118 25.8232 37.7379 26.7871 38.5336 27.1804C39.3292 27.5736 40.2931 27.2475 40.6864 26.4519C41.8631 24.0712 42.4597 21.6108 42.4597 19.1387C42.4597 9.04375 33.2323 0.831055 21.89 0.831055C10.5481 0.831055 1.32031 9.04375 1.32031 19.1387C1.32031 22.9491 2.6122 26.5576 5.06759 29.6351L1.4468 38.2119C1.19257 38.8142 1.32879 39.5107 1.79112 39.973C2.09871 40.2806 2.50956 40.4438 2.92764 40.4438C3.13824 40.4438 3.35073 40.4024 3.55223 40.3173L13.9118 35.9442C16.4384 36.888 19.1192 37.366 21.89 37.366C22.2328 37.366 22.5809 37.3582 22.9245 37.3434C23.8112 37.3045 24.4986 36.5544 24.4597 35.6677C24.4211 34.781 23.6694 34.0914 22.7839 34.1326Z" fill="#DE1587" stroke="white" strokeWidth="1.14276"/>
          </svg>
          <p className="text-[#DE1587] text-xl mt-2 font-[400]">Things That Can Be Improved</p>
          <p className="text-[#000000] text-sm mt-2">{improvement}</p>
          <div className="md:mb-[170px]">

          </div>
        </div>
        <div className="border-[16px] border-[#FEF6FA]">
          {propertyImageUrls && propertyImageUrls[1] && (
            <img src={propertyImageUrls[1]} alt="Property" className="w-full h-60 object-cover rounded-lg" />
          )}
        </div>
      </div>

      {/* Column 3: Primary Property Image, Travel Tip & Ratings */}
      <div className="space-y-6 mt-32">
        <div className="border-[16px] border-[#FEF6FA]">
          {propertyImageUrls && propertyImageUrls[0] && (
            <img src={propertyImageUrls[0]} alt="Property" className="w-full h-60 object-cover rounded-lg" />
          )}
        </div>
        <div className="border-[16px] border-[#FEF6FA] p-4">
          <svg width="39" height="40" viewBox="0 0 39 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.8554 1.41119C11.8638 2.45421 7.81648 6.46279 6.75151 11.4854C5.85226 15.7266 6.9604 19.9845 9.79175 23.1675C11.1758 24.7233 11.9695 26.777 11.9695 28.8078V31.0174C11.9695 32.4875 12.9319 33.7365 14.2596 34.1691C14.6963 36.7488 16.9354 38.8247 19.7032 38.8247C22.4704 38.8247 24.71 36.7495 25.1468 34.1691C26.4745 33.7365 27.437 32.4875 27.437 31.0173V28.8077C27.437 26.773 28.2333 24.7439 29.6792 23.0944C31.7955 20.68 32.9611 17.5821 32.9611 14.3715C32.9611 6.00687 25.3047 -0.354014 16.8554 1.41119ZM19.7032 36.6151C18.283 36.6151 17.0378 35.6379 16.578 34.3245H22.8284C22.3686 35.6379 21.1234 36.6151 19.7032 36.6151ZM25.2273 31.0174C25.2273 31.6266 24.7317 32.1222 24.1225 32.1222H15.284C14.6748 32.1222 14.1791 31.6266 14.1791 31.0174V29.9126H25.2273V31.0174ZM28.0175 21.638C26.4767 23.3959 25.5286 25.5157 25.2881 27.7029H14.1186C13.8783 25.5145 12.9328 23.3739 11.4429 21.6989C9.08312 19.0462 8.16104 15.4905 8.91313 11.9437C9.79102 7.8033 13.1644 4.43987 17.3074 3.57421C24.38 2.09618 30.7514 7.40756 30.7514 14.3715C30.7514 17.046 29.7805 19.6266 28.0175 21.638ZM4.16211 14.3715H1.95248C1.34232 14.3715 0.847656 14.8661 0.847656 15.4763C0.847656 16.0864 1.34232 16.5811 1.95248 16.5811H4.16211C4.77227 16.5811 5.26693 16.0864 5.26693 15.4763C5.26693 14.8661 4.77227 14.3715 4.16211 14.3715ZM4.61973 8.84736L3.05729 7.28492C2.6259 6.85346 1.92633 6.85346 1.49486 7.28492C1.06339 7.71639 1.06339 8.41589 1.49486 8.84736L3.05729 10.4098C3.48869 10.8413 4.18826 10.8413 4.61973 10.4098C5.0512 9.97832 5.0512 9.27883 4.61973 8.84736ZM4.61973 20.5427C4.18826 20.1113 3.48869 20.1113 3.05729 20.5427L1.49486 22.1052C1.06339 22.5367 1.06339 23.2362 1.49486 23.6676C1.92625 24.0991 2.62583 24.0992 3.05729 23.6676L4.61973 22.1052C5.0512 21.6737 5.0512 20.9742 4.61973 20.5427ZM37.454 14.3715H35.2443C34.6342 14.3715 34.1395 14.8661 34.1395 15.4763C34.1395 16.0864 34.6342 16.5811 35.2443 16.5811H37.454C38.0641 16.5811 38.5588 16.0864 38.5588 15.4763C38.5588 14.8661 38.0641 14.3715 37.454 14.3715ZM37.9116 7.28492C37.4802 6.85346 36.7806 6.85346 36.3492 7.28492L34.7867 8.84736C34.3553 9.27883 34.3553 9.97832 34.7867 10.4098C35.2181 10.8412 35.9177 10.8413 36.3492 10.4098L37.9116 8.84736C38.3431 8.41589 38.3431 7.71639 37.9116 7.28492ZM37.9116 22.1052L36.3492 20.5427C35.9178 20.1113 35.2182 20.1113 34.7867 20.5427C34.3553 20.9742 34.3553 21.6737 34.7867 22.1052L36.3492 23.6676C36.7806 24.099 37.4801 24.0991 37.9116 23.6676C38.3431 23.2362 38.3431 22.5367 37.9116 22.1052Z" fill="#DE1587" stroke="white" strokeWidth="0.457105"/>
          </svg>
          <p className="text-[#DE1587] text-xl mt-2 font-[400]">Travel Tip</p>
          <p className="text-black text-sm mt-2">{tip}</p>
          <div className="md:mb-[170px]">

          </div>
        </div>
        <div className="border-[16px] border-[#FEF6FA] p-4">
          <svg width="50" height="46" viewBox="0 0 50 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.8425 20.9088C32.2899 20.9128 28.1368 23.5086 26.1383 27.5991C26.029 27.565 25.9233 27.5317 25.8234 27.4993L24.9317 25.4919C27.0391 23.8946 27.6178 21.418 27.7761 20.2167C29.2087 19.8292 30.5253 18.1453 31.0526 15.9142C31.3363 14.7086 30.9207 13.5863 30.0182 13.1212C29.7675 12.9911 29.4889 12.9239 29.2064 12.9251C29.2533 12.5743 29.3021 12.145 29.3527 11.6172C29.4707 10.3866 29.5459 9.14366 29.5459 8.8284C29.5459 7.51078 29.0972 5.51122 27.8383 3.85066C25.7428 1.08771 22.4359 0.507812 20.0306 0.507812C17.6648 0.507812 14.3771 1.0488 12.1501 3.62594C10.3967 5.6549 10.0156 8.13251 10.1871 9.30311C10.1933 9.34544 10.231 9.54491 10.2912 9.84268C10.2945 9.88186 10.301 9.92069 10.3106 9.95878C10.3123 9.96485 10.3172 9.98314 10.3253 10.01C10.4795 10.7613 10.7426 11.9703 11.0145 12.9706C10.7684 12.992 10.5295 13.0643 10.3128 13.1828C9.44642 13.651 9.04921 14.749 9.32426 15.9146C9.85241 18.1498 11.1727 19.8351 12.6082 20.2191C12.7772 21.3867 13.3644 23.8074 15.3768 25.4069L14.4257 27.4571C13.7529 27.6673 13.0133 27.8734 12.2302 28.0899C7.42412 29.4186 0.847656 31.2383 0.847656 37.2918V41.6569C0.847656 43.1361 2.74608 44.7206 4.09017 44.7206H36.3506C36.5138 44.7273 36.6776 44.7316 36.8425 44.7316C41.1063 44.744 45.0515 42.4764 47.187 38.7859C49.3225 35.0954 49.3225 30.545 47.187 26.8545C45.0515 23.164 41.1063 20.8964 36.8425 20.9088ZM13.2199 4.5514C14.727 2.80728 17.0183 1.92294 20.0303 1.92294C23.0626 1.92294 25.3104 2.85931 26.7109 4.706C27.2107 5.37027 27.5878 6.11851 27.8243 6.91543C27.1889 6.22637 26.454 5.63624 25.6439 5.16464C25.4546 5.05829 25.2266 5.04558 25.0266 5.1302C24.8266 5.21482 24.6771 5.38726 24.6215 5.59721C24.6134 5.6255 23.7425 8.46009 18.2457 10.9459C16.1893 11.8755 14.5321 12.0589 13.3196 11.49C12.5382 11.1104 11.9455 10.4285 11.6786 9.60179L11.6778 9.59917C11.634 9.38182 11.602 9.20772 11.5859 9.09849C11.3347 7.38236 12.5783 5.29387 13.2199 4.5514ZM13.9582 19.5655C13.9406 19.1871 13.6297 18.8887 13.2509 18.8865H13.2226C12.3779 18.8865 11.1682 17.5693 10.7004 15.5896C10.5554 14.9749 10.7462 14.5563 10.9848 14.4276C11.2552 14.2815 11.543 14.538 11.6541 14.6552C11.909 14.9242 12.3281 14.9509 12.615 14.7165C12.902 14.4821 12.9594 14.0661 12.7467 13.7627C12.6608 13.6037 12.5244 13.1538 12.375 12.59C12.476 12.6489 12.5815 12.7052 12.6922 12.758C13.3766 13.0767 14.1241 13.2368 14.8791 13.2264C16.047 13.2264 17.3677 12.8955 18.8287 12.2348C23.187 10.2637 24.9396 8.02682 25.6076 6.82813C25.9299 7.06357 26.2348 7.32193 26.5199 7.60122C27.5114 8.5768 28.0159 9.59553 28.0204 10.6293C27.9156 11.908 27.7537 13.4251 27.6095 13.7934C27.4136 14.1058 27.4905 14.5163 27.7862 14.7365C28.0819 14.9568 28.4972 14.9129 28.7404 14.6357C28.8718 14.4862 29.1278 14.2543 29.3702 14.379C29.6319 14.5138 29.8208 14.9732 29.6756 15.5896C29.2049 17.5815 27.9837 18.9012 27.1385 18.8866C26.7505 18.8794 26.4291 19.1859 26.4178 19.5737C26.3875 20.1559 26.1112 23.1354 23.6802 24.6381C22.7372 25.2205 21.5622 25.5158 20.188 25.5158C18.8186 25.5158 17.6467 25.214 16.7045 24.6187C14.3169 23.1114 13.998 20.1448 13.9582 19.5655ZM15.5784 28.3343L16.5837 26.167C17.6237 26.6735 18.8323 26.9304 20.1881 26.9304C21.5083 26.9304 22.6885 26.6928 23.7088 26.2238L24.6578 28.3599C24.7382 28.5409 24.8907 28.6799 25.0783 28.7431C25.2393 28.7974 25.409 28.8526 25.5913 28.9101C25.4781 29.2348 25.3788 29.5655 25.2934 29.9023C24.5245 31.3055 22.7452 32.9107 20.1881 32.9107C16.8517 32.9107 15.1618 30.2911 14.8222 28.8152C14.9348 28.7801 15.0463 28.7444 15.1556 28.7093C15.3425 28.6484 15.4957 28.5126 15.5784 28.3343ZM4.09017 43.306C3.41974 43.306 2.26228 42.258 2.26228 41.6569V37.2918C2.26228 35.0802 3.30455 33.4195 5.5545 32.0656C7.59094 30.8402 10.2531 30." fill="#DE1587" stroke="white" strokeWidth="0.457105"/>
          </svg>
          <p className="text-[#DE1587] text-xl mt-2 font-[400]">Suitable for</p>
          <p className="text-black text-sm mt-2">{suitable}</p>
          <div className="md:mb-[130px]">

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
