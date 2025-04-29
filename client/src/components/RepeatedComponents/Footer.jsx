import React from 'react';
import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";

const Footer = () => {
  return (
    <footer className="bg-[#161616] text-white px-6 sm:px-20 py-16 lg:px-16 xl:p-28">
      <div className="container grid grid-cols-1 lg:grid-cols-4 gap-2 text-center lg:text-left">
        
        {/* Social Media Section */}
        <div className="space-y-4 lg:px-2 xl:px-8 sm:mt-24">
          <div className="flex justify-center lg:justify-start space-x-4 mb-10">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="text-white text-4xl sm:text-5xl lg:text-3xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-white text-4xl sm:text-5xl lg:text-3xl" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube className="text-white text-4xl sm:text-5xl lg:text-3xl" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="facebook">
              <ImFacebook2 className="text-white text-4xl sm:text-5xl lg:text-3xl" />
            </a>
          </div>
          <p className="text-sm sm:text-xl lg:text-sm text-[#FFFFFF] xl:text-base ">
            Address:<br /> 4th Floor, Rishab Arcade, Sanjay Nagar Main Rd, above Nirmala Jewellers, MET Layout,
            Geddalahalli, R.M.V. 2nd Stage, Bengaluru, Karnataka 560094
          </p>
        </div>

        {/* Partnerships Section */}
        <div className="space-y-2  lg:pl-8 xl:pl-20">
          <p className=" text-xl sm:text-2xl xl:text-xl lg:text-lg text-white mt-20 mb-4 sm:mt-24 font-poppins font-[600]">Partnerships</p>
          <ul className="space-y-2">
            <li>
              <a href="/partner-with-us" className="hover:underline xl:text-xl lg:text-lg sm:text-xl font-[400]">
                Partner with Us
              </a>
            </li>
            <li>
              <a href="/corporate-stays" className="hover:underline xl:text-xl lg:text-lg sm:text-xl font-[400]">
                Corporate Stays
              </a>
            </li>
          </ul>
        </div>

        {/* Legal and Compliance Section */}
        <div className="space-y-2 lg:pl-2 xl:pl-6">
          <p className="text-xl sm:text-2xl xl:text-xl lg:text-lg text-white mt-20 mb-4 sm:mt-24 font-poppins font-[600]">Legal and Compliance</p>
          <ul className="space-y-2">
            <li>
              <a href="/terms-and-conditions" className="hover:underline xl:text-xl lg:text-lg sm:text-xl font-[400]">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="/Privacy" className="hover:underline xl:text-xl lg:text-lg sm:text-xl font-[400]">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/cookie-policy" className="hover:underline xl:text-xl lg:text-lg sm:text-xl font-[400]">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="space-y-2 lg:pl-12 xl:pl-28">
          <p className="text-xl sm:text-2xl xl:text-xl lg:text-lg text-white mt-20 mb-4 sm:mt-24 font-poppins font-[600]">Resources</p>
          <ul className="space-y-2">
            <li>
              <a href="/blog" className="hover:underline xl:text-xl lg:text-lg sm:text-xl font-[400]">
                Blog
              </a>
            </li>
            <li>
              <a href="/Contact" className="hover:underline xl:text-xl lg:text-lg sm:text-xl font-[400]">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        
        <div className=" mt-24 text-center lg:text-start lg:text-xs xl:text-base text-white">
          <br />
          © 2024 Yuyiii. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
