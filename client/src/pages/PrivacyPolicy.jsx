import React from 'react';
import privacyImg from '../assets/images/Images/privacy-banner.png';
import PartnerSection from '../components/RepeatedComponents/Partners';

  
const PrivacyPolicy = () => {
  return (
    <>
    <div className="privacy-policy-page"> {/* Add this wrapper */}
     <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap');
          
          .privacy-policy-page body {
            font-family: "Poppins", sans-serif;
            font-weight: 300;
            font-size: 14px;
            background: #FFFFFF;
          }

          h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
            font-family: "Merriweather", serif;
            font-weight: 700;
            color: #000;
            margin-bottom: 0px;
            line-height: 1.3;
          }

          .d-banner-withhead-container {
          background: #FFFFFF;
            overflow: hidden;
            position: relative;
            width: 100%;
              height: auto;
          }
          
          .d-banner-withhead-container .container .col {
            position: absolute;
            bottom: 20px;
            color: #fff;
          }
          
          .privacy-txt-container .lead {
            font-size: 16px;
            font-weight: 300;
            color: #0099d9;
            border-left: solid 3px #0099d9;
            padding-left: 15px;
          }

          .terms-banner {
            width: 100%;
            font-size: 35px;
            font-weight: 700;
            object-fit: cover;
            color: #fff;
          }
          
          .privacy-txt-container p {
            margin-top: 15px;
          }
          
          .privacy-txt-container h3 {
            margin-top: 20px;
            font-size: 30px;
          }
          
          .privacy-txt-container a.h6 {
            line-height: 40px;
          }
          
          .d-backtotop-btn {
            z-index: 0;
            position: fixed;
            right: 15px;
            bottom: 15px;
          }
          
          .d-backtotop-btn:hover {
            transform: scale(1.2);
          }
          
          .d-backtotop-btn img {
            transform: rotate(-90deg);
          }

          .d-white {
            color: #fff;
          }

          .accordion {
            margin-top: 15px;
          }

          .card {
            margin-bottom: 5px;
            border: 1px solid rgba(0,0,0,.125);
            border-radius: 0.25rem;
          }

          .card-header {
            padding: .75rem 1.25rem;
            background-color: rgba(0,0,0,.03);
            border-bottom: 1px solid rgba(0,0,0,.125);
            cursor: pointer;
          }

          .collapse {
            display: none;
          }

          .collapse.show {
            display: block;
          }

          .card {
            margin-bottom: 5px;
            border: 1px solid rgba(0,0,0,.125);
            border-radius: 0.25rem;
          }

          .card-header {
            padding: 0.75rem 1.25rem;
            background-color: #f8f9fa;
            border-bottom: 1px solid rgba(0,0,0,.125);
            cursor: pointer;
            transition: background-color 0.2s ease;
          }

          .card-header:hover {
            background-color: #f0f0f0;
          }

          .container {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
          }

          @media (min-width: 992px) {
            .container {
              max-width: 960px;
            }
          }

          @media (min-width: 1200px) {
            .container {
              max-width: 1180px;
            }
          }

          .h6 {
            font-size: 14px;
            font-weight: 700;
            color: #000;
            margin-bottom: 0px;
            line-height: 1.3;
          }

          .col-md-3 {
            position: relative;
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
          }

          @media (min-width: 768px) {
            .col-md-3 {
              flex: 0 0 25%;
              max-width: 25%;
            }
          }

          .col-md-8 {
            position: relative;
            width: 100%;
            padding-right: 15px;
            padding-left: 45px;
          }

          @media (min-width: 768px) {
            .col-md-8 {
              flex: 0 0 66.666667%;
              max-width: 66.666667%;
            }
          }

          .lead {
            font-size: 1.25rem;
            font-weight: 300;
          }

          .row {
            display: flex;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          }

          .d-mainbanner {
            width: 100%;
            height: 40vh;
            object-fit: cover;
          }

          .text-uppercase {
            text-transform: uppercase;
          }

          .f12 {
            font-size: 12px;
            font-weight:600;
          }

          .mb-0 {
            margin-bottom: 0;
          }

          h5, .h5 {
            font-size: 15px;
          }
          .accordion-item {
            border: 1px solid #ddd;
            margin-bottom: 8px;
            border-radius: 4px;
            overflow: hidden;
        }
        .accordion-header {
            font-family: "Merriweather", serif;
            font-size: 16px;
            font-weight: bold;
            padding: 0.75rem 1.25rem;
            background-color: #f8f9fa;
            border-bottom: 1px solid rgba(0,0,0,.125);
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        .accordion-header:hover {
          background-color: #e2e6ea;
        }
        .accordion-body {
          padding: 16px;
          background-color: #fff;
          display: none;
        }
        .accordion-body.show {
          display: block;
        }  
        `}
      </style>

      {/* Main Banner */}
      <div className=" d-banner-withhead-container">
      
        <div className="row">
          <div className="col-12 w-full">
            <img src={privacyImg} className="d-mainbanner w-full" alt="Privacy Policy Banner" />
          </div>
        </div>
        <div id="privacyTxt" className="container">
          <div className="row">
            <div className="col">
              <p className="f12 text-uppercase">Updated: January 2025</p>
              <h1 className="terms-banner">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container privacy-txt-container">
        <div className="row">
          {/* Sidebar Navigation */}
          <div style={{ marginTop: '8px' }} className="col-md-4">
            <div><a href="#personalInfo" className="h6">Personal Information</a></div>
            <div><a href="#automaticInfo" className="h6">Automatic Information</a></div>
            <div><a href="#cookiesInfo" className="h6">Cookies</a></div>
            <div><a href="#purchaseInfo" className="h6">Making a Purchase</a></div>
            <div><a href="#modificationsInfo" className="h6">Modifications to this Privacy Statement</a></div>
          </div>

          {/* Content Section */}
          <div className="col-md-8 mt-3 mt-md-0">
            <p className="lead">
              This Privacy Statement applies to your use of this Site only. We do not own, operate, or control the websites of our Franchisees or sales associates. Accordingly, this Statement does not apply to a Franchisee’s or sales associate’s website or to a Franchisee’s or sales associate’s collection, use, storage, and disclosure of your Personal Information.
            </p>

            <h3 id="personalInfo">Personal Information</h3>
            <p>
              We only store the information you provide us about yourself. This information includes personal details that you may have provided us during sign-up or through the enquiry form on the website.
            </p>
            <p>
              Personal Information means and includes all information that can be linked to a specific individual or used to identify any individual, such as name, address, mailing address, telephone number, email address, travel details, bookings, co-passengers, and any details requested during visits or usage of the website.
            </p>
            <p>
              If you choose to share personal information through testimonials, reviews, comments, or blogs related to Yuyi Stays and Travels Pvt. Ltd., this information might be visible to third parties, who may use it for promotional purposes. Yuyi Stays and Travels Pvt. Ltd. is not liable for such actions where the user willingly discloses information on public forums.
            </p>

            <h3 id="automaticInfo">Automatic Information</h3>
            <p>
              We automatically collect some information about your computer when you visit the website, such as your IP address, web browser software, and information about your online activity, like trips viewed and purchases made. This automatic information is used to customize your user experience.
            </p>

            <h3 id="cookiesInfo">Cookies</h3>
            <p>
              "Cookies" are small pieces of information stored by your browser on your computer's hard drive. They can only be read by the server that placed them and cannot run programs, plant viruses, or harvest your Personal Information. Cookies allow us to serve you better and personalize your experience on our website.
            </p>
            <p>
              Cookies may help remember your login ID and password. Most web browsers automatically accept cookies, but you can modify your browser settings to control how cookies are accepted. If you choose not to accept cookies from Yuyi Stays and Travels Pvt. Ltd., you may not be able to use all functionalities of the website.
            </p>

            <h3 id="purchaseInfo">Making a Purchase</h3>
            <p>
              To purchase travel or related services through our website, you must provide Personal Information such as your name, telephone number, email address, and the names of travelers (if not you). This information is required to process, fulfill, and confirm your reservations and transactions.
            </p>
            <p>
              If you are making a reservation for others, you must confirm and represent that these travelers have agreed that you may disclose their Personal Information to us. When you make a reservation, we may share certain Personal Information with third parties such as hotels or car rental agencies to fulfill your travel arrangements. However, we do not sell or rent customer names or Personal Information to third parties.
            </p>

            <h3 id="modificationsInfo">Modifications to this Privacy Statement</h3>
            <p>
              By using the website, you agree to the terms of our Privacy Policy. Yuyi Stays and Travels Pvt. Ltd. may modify this Privacy Policy at any time. If significant changes are made, we will post a prominent notice of such changes on our Privacy Policy page and home page. You are responsible for reviewing this Privacy Policy periodically. Your continued use of the website indicates your acceptance of any changes.
            </p>
            <p>Thank you for using the website!</p>
            <br/><br/>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="row">
          <div className="col">
            <a href="#privacyTxt" className="d-backtotop-btn">
              <svg
                version="1.1"
                viewBox="0 0 1600 1600"
                width="60"
                height="60"
                style={{ background: 'transparent' }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  transform="translate(789,64)"
                  d="m0 0h25l29 1..."
                  fill="#de1587"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <PartnerSection />
      </div>
      
    </>
  );
};

export default PrivacyPolicy;
