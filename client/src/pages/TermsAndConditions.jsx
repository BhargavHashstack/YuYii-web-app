import React, { useState } from 'react';
import tncimg from '../assets/images/Images/terms-banner.jpg';
import PartnerSection from '../components/RepeatedComponents/Partners';


const TandC = () => {
  const [activeAccordion, setActiveAccordion] = useState(1);

  const handleAccordionClick = (id) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  // Accordion items
  const accordionItems = [
    {
      id: 1,
      title: 'Eligibility for Best Price Guarantee',
      content:
        'The rate that you notify should be live and available at the time of your notification and when our Guest Services team checks it on the reported website. It should be for the same dates, same property, same accommodation (room/bed type), same number of adults, meal type, should not be part of any kind of promotion. The Tariff must be subject to the same booking and cancellation policies.',
    },
    {
      id: 2,
      title: 'Why should the rate be Live at the time of submission?',
      content:
        'This allows for the Guest Services team to contact the Hotel in question while the lower rate is live and bookable. Without this condition, we cannot guarantee if we can match the rate.',
    },
    {
      id: 3,
      title: 'How can I make the claim?',
      content: 'Please fill up this form.',
    },
    {
      id: 4,
      title: 'Is the discount given by the Hotel considered public or not?',
      content:
        'No, the discount negotiated by a guest offline is not considered publicly available.',
    },
    {
      id: 5,
      title: 'Which platform is considered authorized?',
      content:
        'There have been a lot of online scams and hence the possibility that some platform which is not legitimate may be showcasing a considerably lower price. Here, we will not be able to extend best price guarantee and also protect our buyers from untrustworthy sellers.',
    },
  ];

  return (
    <>
    <div className='terms-and-contditions'>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap');
          
          .terms-and-conditions body {
            font-family: "Poppins", sans-serif;
            font-weight: 300;
            font-size: 14px;
          }

          h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
            font-family: "Merriweather", serif;
            font-weight: 700;
            color: #000;
            margin-bottom: 0px;
            line-height: 1.3;
          }

          .d-banner-withhead-container {
            overflow: hidden;
            position: relative;
          }
          
          .d-banner-withhead-container .container .col {
            position: absolute;
            bottom: 20px;
            color: #fff;
          }
          
          .privacy-txt-container {
            padding-bottom: 50px;
          }
          
          .privacy-txt-container .lead {
            font-size: 16px;
            font-weighy: 700;
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
              max-width: 1200px;
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
            padding-left: 15px;
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
      <div className="d-banner-withhead-container">
      
        <div className="row">
          <div className="col-12 w-full">
            <img src={tncimg} className="d-mainbanner" alt="Terms Banner" />
          </div>
        </div>
        <div id="privacyTxt" className="container">
          <div className="row">
            <div className="col">
              <p className="f12 text-uppercase">Revised: June 2024</p>
              <h1 className="terms-banner">Terms and conditions</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container privacy-txt-container">
        <div className="row">
          <div style={{ marginTop: '8px' }} className="col-md-3">
            <div><a href="#bestPriceInfo" className="h6">Best-Price Guarantee</a></div>
            <div><a href="#usageInfo" className="h6">Terms of Usage</a></div>
            <div><a href="#feesInfo" className="h6">Fees</a></div>
            <div><a href="#refundInfo" className="h6">Cancellation or Refunds</a></div>
            <div><a href="#disclaimerInfo" className="h6">Website Disclaimer</a></div>
          </div>
          <div className="col-md-8 mt-3 mt-md-0">
            <p className="lead">
              The website of Yuyi Stays and Travels Pvt. Ltd. and all of the content found on this site, is the copyrighted property of Yuyi Stays and Travels Pvt. Ltd. By using the Yuyi Stays and Travels Pvt. Ltd website located at www.yuyiii.com, you agree to the terms of service defined below as well as any other guidelines, rules and additional terms referenced herein, and all such guidelines, terms and rules are hereby incorporated herein by this reference (collectively, "Terms of Service". Please read these Terms of Service carefully.
            </p>
            <h3 id="bestPriceInfo">Best Price Guarantee</h3>
            <p>Yuyiii's policy is to help you Dream, Discover and Book with us for life!</p>
            <p>Our best-rate guarantee means that if you discover a stay with and find it cheaper somewhere else, we will match that rate. You will also receive Yuyiii-Love Loyalty Points worth Rs 1000 which will act as a Flat 1000 Rs off in your next booking with us as a reward that you reported this issue with us. We love you!</p>

            <h3>FAQs</h3>
            <div className="accordion" id="faqAccordion">
            {accordionItems.map((item) => (
        <div className="accordion-item" key={item.id}>
          {/* Accordion Header */}
          <div
            className="accordion-header"
            onClick={() => handleAccordionClick(item.id)}
          >
            {item.title}
          </div>

          {/* Accordion Body */}
          <div
            className={`accordion-body ${activeAccordion === item.id ? 'show' : ''}`}
          >
            {item.content}
          </div>
        </div>
      ))}
            </div>

            <h3 id="usageInfo">Terms of Usage</h3>
            <p>This site and the content provided in this site, including the text, graphics, button icons, may not be copied, reproduced, republished, uploaded, posted, transmitted or distributed without the written permission of Yuyi Stays and Travels Pvt. Ltd., except that you may download, display and print the materials presented on this site for your personal, non-commercial use only.</p>

            <h3 id="feesInfo">Fees</h3>
            <p>Yuyi Stays and Travels Pvt. Ltd reserves the right to charge transaction fees based on certain completed transactions using its services. The user shall be completely responsible for all charges, fees, duties, taxes, and assessments arising out of the use of the services.</p>

            <h3 id="refundInfo">Cancellation or Refunds</h3>
            <p>Yuyi Stays and Travels Pvt. Ltd expressly follows the cancellation / refund policy as that of the provider with whom the booking is made. We shall communicate the said polices to you at the time of finalization of trip/package.</p>

            <h3 id="disclaimerInfo">Website Disclaimer</h3>
            <p>The information contained in this website is for general information purposes only. The information is provided by Yuyi Stays and Travels Pvt. Ltd. and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <a href="#privacyTxt" className="d-backtotop-btn">
              <svg version="1.1" viewBox="0 0 1600 1600" width="60" height="60" style={{background: 'transparent'}} xmlns="http://www.w3.org/2000/svg">
                <path transform="translate(789,64)" d="m0 0h25l29 1 39 3 39 5 37 7 26 6 34 10 38 13 35 14 28 13 16 8 25 13 36 22 15 10 14 10 19 14 14 11 16 13 10 9 11 9 14 14 7 6v2l4 2v2l4 2v2l4 2 7 8 9 9 7 8 12 14 11 13 9 12 26 36 11 17 17 28 16 29 11 22 14 32 14 36 11 33 11 40 8 39 6 35 4 36 2 26v74l-3 43-5 38-8 41-8 34-9 31-10 30-12 30-16 36-17 34-14 24-11 18-22 33-13 18-13 16-9 11-11 13-11 12-7 8-4 5h-2l-2 4h-2l-2 4-11 11-8 7-8 8-11 9-11 10-14 11-18 14-19 14-18 12-24 15-26 15-27 14-22 11-31 13-44 16-36 11-28 7-41 8-41 6-33 3-33 2h-48l-43-3-36-4-35-6-43-10-28-8-40-13-35-14-33-15-19-10-16-8-20-12-23-14-16-11-38-28-11-9-14-12-24-22-9-9-8-7-1-3h-2l-7-8-10-10-7-8-15-16-9-11-10-12-15-20-13-18-11-17-16-26-9-16-11-20-11-23-9-20-10-24-15-42-8-27-9-35-6-28-6-37-4-33-2-29-1-25v-22l2-42 4-38 6-38 7-35 10-39 12-38 15-40 12-27 21-42 9-16 12-20 10-16 9-13 11-16 12-15 12-16 8-10 12-14 12-13 7-8 12-13 13-13 8-7 16-15 11-9 13-11 11-8 21-16 13-9 15-10 14-9 15-9 21-12 23-12 33-16 35-14 22-8 29-9 38-10 39-8 38-6 35-3zm-118 447-10 3-9 6-14 12-20 20-17 16-197 197-7 8-9 12-4 9-1 7 4 10 12 16 14 15 143 143 13 14h2l1 3 5 5h2l2 4 36 36 8 7 12 12 8 7 15 11 9 3h10l11-8 8-8 5-8 1-9-4-10-6-9-9-10-5-6h-2l-2-4-97-97-7-8-15-15-8-7-40-40-8-7-5-7 1-1 24-1 640-1 30-1 9-3 6-5 6-12 1-5v-11l-3-12-5-9-5-3-7-1-23-1-104-1h-520l-48-1-3-1 7-8 8-7 15-14 23-23 7-8 35-35v-2l4-2 86-86 7-8 9-10 6-10 1-3v-10l-4-10-6-8-7-6-7-3z" fill="#de1587"/>
                <path transform="translate(900,723)" d="m0 0h8l4 1 10 1 4-1v2l5-1 13-2 10 2h17l13 1 9 3 28 1 5 2 5 1 5 2 6 1 1-4 9-1 4 4-3 5-3 1v2l10-1 2-1v-2l4-1 10 1 2 1 1 4-5 1-10-2 1 1 11 2 18 2 19 1h27l13 2 15 5 7 3 5 3 3 6h-637l-48-1-4-2 8-9 8-7 4-4 7 1 5-1 5 1v3h8l2-4 4 1 1 2 6-2h10l6-2 10-1 7-2h6l7-1 4 1v2l2 1-1 3 6 1 4 2h12l9-1 9 2h14l16-1h29l5-1 12-1 3-1 16 2 1-4 4-3 5-1v-3l3-4h2v4l4-2 1-2 7 1 10-2h13v-2l3-1h12v-2h5l1 1h8l5-1 13-1h10l8-1h18l26-1z" fill="#de1587"/>
                <path transform="translate(521,831)" d="m0 0h656l-2 2-9 2-9 3h-72l-5 1h-36l-30 1-12-1-1 2v-2l-7 1-7-1-1 2-3-1-7-1v2l-4 1-8-1-4 2-1-1-11-1h-4l-4 2-6-1h-8-2l-5 1-4-2-4 1-10 1-5 1-4-1-8 1h-9l-15-1-6 1-7-1-5 1h-8l-5-1-6 1h-41l-18-2-7 2-9-1h-15l-12 1-14-1-13 1-23-1h-18l-17-1h-8l-8-2-10 1-3-1-4 1-3-1h-17l-12-1-29-1h-12l-3 1h-9l-8 6h-2v2l-4-2-8-9-1-3 2-1z" fill="#de1587"/>
                <path transform="translate(789,64)" d="m0 0h25l29 1 30 2 2 2-16 1h-118l-17-1 2-2 33-2z" fill="#de1587"/>
                <path transform="translate(872,1519)" d="m0 0 4 1 4 3 6 4-1 2-20 2h-15l-3-2-7-1 3-2h16l3-1 5 1h10l-1-1h-7l-6-4 2-1z" fill="#de1587"/>
                <path transform="translate(65,753)" d="m0 0h1l1 94-2-2-1-9-1-25v-22l1-26z" fill="#de1587"/>
                <path transform="translate(785,1531)" d="m0 0h21l20 1v1l-7 1h-48l-4-2z" fill="#de1587"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container">
  <PartnerSection />
</div>

      
      </div>
      
      
    </>
    
    
  );
};

export default TandC;