import React, { useState } from "react";

const FAQSection = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-6 max-w-full lg:px-16 mx-auto">
      <p className="text-base sm:text-xl lg:text-2xl font-[500] font-poppins mb-5">Frequently Asked Questions</p>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="shadow-[0px_4px_2px_rgba(0,0,0,0.1)]  rounded-2xl mb-4 overflow-hidden"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left flex justify-between items-center p-6 lg:p-12 bg-white"
          >
            <p className="text-base sm:text-xl lg:text-2xl font-[500] font-poppins">{faq.question}</p>
            <span className="text-gray-500">
              {activeIndex === index ? (
                <svg
                  className="w-[13px] h-[13px] sm:w-[22px] sm:h-[22px] "
                  width="20"
                  height="20"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 26.625L0.375 24L10.875 13.5L0.375 3L3 0.375L13.5 10.875L24 0.375L26.625 3L16.125 13.5L26.625 24L24 26.625L13.5 16.125L3 26.625Z"
                    fill="black"
                  />
                </svg>
              ) : (
                <svg
                  className="w-[15px] h-[15px] sm:w-[25px] sm:h-[25px]"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.3853 10.5601V1.40338C10.3853 0.771238 10.8977 0.258789 11.5298 0.258789C12.162 0.258789 12.6744 0.771238 12.6744 1.40338V10.5601H21.8311C22.4633 10.5601 22.9757 11.0725 22.9757 11.7047C22.9757 12.3368 22.4633 12.8492 21.8311 12.8492H12.6744V22.0059C12.6744 22.6381 12.162 23.1505 11.5298 23.1505C10.8977 23.1505 10.3853 22.6381 10.3853 22.0059V12.8492H1.22857C0.596433 12.8492 0.0839844 12.3368 0.0839844 11.7047C0.0839844 11.0725 0.596433 10.5601 1.22857 10.5601H10.3853Z"
                    fill="black"
                  />
                </svg>
              )}
            </span>
          </button>
          {activeIndex === index && (
            <div className="px-6 pb-4 lg:px-10 lg:pb-8 bg-white font-[400] font-poppins text-base sm:text-xl lg:text-2xl text-[#747474]">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
