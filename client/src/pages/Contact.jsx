import React from 'react';
import './ContactUs.css';  // Import CSS file

import fbicon from '../assets/images/Images/fb-ico.jpg';
import instaicon from '../assets/images/Images/instagram-ico.jpg';
import yticon from '../assets/images/Images/youtube.png';
import linkedinicon from '../assets/images/Images/linkedin.png';
import callicon from '../assets/images/Images/cont-call-ico.png';
import touchicon from '../assets/images/Images/cont-touch-ico.png';
import addressicon from '../assets/images/Images/cont-address-ico.png';
import banner from '../assets/images/Images/contact-banner.jpg';
import PartnerSection from '../components/RepeatedComponents/Partners';

const ContactUs = () => {
  return (
    <div className="bg-[#FFFFFF] contact-page">
      {/* Main Banner */}
      <div className="d-banner-withhead-container">
        <img src={banner} className="main-banner" alt="Contact Us Banner" />
        <div className="banner-content">
          <div className="banner-content-inner">
            <p className="header-text">Here to help</p>
            <h1 className="section-title">Contact Us</h1>
          </div>
        </div>
      </div>

      <div className="contact-container">
        <div className="intro-group">
          <h4 className="contact-title-large">
            Get in touch with us! We are here,<br /> when you need us.
          </h4>
          <p className="contact-subtitle font-[300] text-poppins text-[#000000]">Have something you wanted to talk to us?</p>
          <p className="contact-subtitle font-[300] text-poppins text-[#000000]">No problem! Give us a call or send us a message.</p>
        </div>

        <div className="media center-aligned">
          <img src={callicon} className="contact-icon" alt="Call Icon" />
          <div className="media-body">
            <h5 className="contact-title">Quick question?</h5>
            <p className="contact-subtitle font-[300] text-poppins text-[#000000]">
              Call us on <a href="tel:+91-8657519123" className="call-link">+91-86575 19123</a>
            </p>
          </div>
        </div>

        <div className="media center-aligned">
          <img src={touchicon} className="contact-icon" alt="Touch Icon" />
          <div className="media-body">
            <h5 className="contact-title">Stay in touch</h5>
            <div className="social-icons">
              <a href="https://fb.me/YuyiiiStays" target="_blank" rel="noopener noreferrer">
                <img className="social-icon" src={fbicon} alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/yuyiiistays/" target="_blank" rel="noopener noreferrer">
                <img className="social-icon" src={instaicon} alt="Instagram" />
              </a>
              <a href="https://www.youtube.com/channel/UCSFmg3MvCmIJKm2MCm5JsWg/featured" target="_blank" rel="noopener noreferrer">
                <img className="social-icon" src={yticon} alt="YouTube" />
              </a>
              <a href="https://www.linkedin.com/company/yuyiii/" target="_blank" rel="noopener noreferrer">
                <img className="social-icon" src={linkedinicon} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>

        <div className=" media">
          <img src={addressicon} className="contact-icon" alt="Address Icon" />
          <div className="media-body">
            <h5 className="contact-title">Meet here</h5>
            <p className="contact-address">
              4th Floor, Rishab Arcade, Sanjay Nagar Main Rd,<br />
              above Nirmala Jewellers, MET Layout,<br />
              Geddalahalii, R.M.V. 2nd Stage,<br />
              Bengaluru,<br />
              Karnataka 560094
            </p>
          </div>
        </div>
      </div>
      <PartnerSection />
    </div>
  );
};

export default ContactUs;
