import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import s3ImageRouter from './routes/s3image.route.js';
import imagesRouter from './routes/images.route.js';
// Import routers
import searchRouter from "./routes/search.route.js";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import propRouter from './routes/property.route.js';
import activityRouter from './routes/activity.route.js';
import amenityRouter from './routes/amenity.route.js';
import tripTypeRouter from './routes/triptype.route.js';
import stayTypeRouter from './routes/staytype.route.js';
import destinationRouter from "./routes/destination.route.js";
import propertyTypeRouter from './routes/propertytype.route.js';
import stayRouter from './routes/stay.route.js';
import stateRouter from "./routes/state.route.js";
import cityRouter from './routes/city.route.js';
import hubRouter from './routes/hub.route.js';
import selectedstayRouter from "./routes/selectedstay.route.js";
import selectedDestinationRouter from './routes/selecteddestination.route.js';
import newSelectedStayRouter from "./routes/newSelectedStay.route.js";
import homeRouter from "./routes/home.route.js";
import reviewRouter from "./routes/review.route.js";
import stayGalleryRouter from './routes/stayGallery.route.js';
import bookingRouter from './routes/booking.route.js';

import nodemailer from 'nodemailer';
import twilio from 'twilio';
import Booking from './models/booking.model.js';

// Import AWS SDK for S3
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

const __dirname = path.resolve();

// Middleware to parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/property-api', s3ImageRouter);

// Mount routes
app.use('/property-api/user', userRouter);
app.use('/property-api/auth', authRouter);
app.use('/property-api/property', propRouter);
app.use('/property-api/search', searchRouter);
app.use('/property-api/activities', activityRouter);
app.use('/property-api/amenities', amenityRouter);
app.use('/property-api/triptypes', tripTypeRouter);
app.use('/property-api/staytypes', stayTypeRouter);
app.use('/property-api/stays', stayRouter);
app.use('/property-api/destinations', destinationRouter);
app.use('/property-api/selecteddestinations', selectedDestinationRouter);
app.use('/property-api/propertytypes', propertyTypeRouter);
app.use('/property-api/states', stateRouter);
app.use('/property-api/cities', cityRouter);
app.use('/property-api/hubs', hubRouter);
app.use('/property-api/selectedstay', selectedstayRouter);
app.use('/property-api/newselectedstay', newSelectedStayRouter);
app.use('/property-api/home', homeRouter);
app.use('/property-api/reviews', reviewRouter);
app.use('/property-api/staygallery', stayGalleryRouter);
app.use('/property-api/booking', bookingRouter);
app.use('/property-api/images', imagesRouter);
// Serve static files in production
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists. Please choose a different one.`,
    });
  }
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || 'Internal Server Error',
  });
});

// Payment endpoints configuration
const PAYU_CONFIG = {
  KEY: "5EMeYI",
  SALT: "MGa33wGx"
};

// Updated Hash Generation Endpoint to use udf1 and udf2
app.post('/property-api/generate-hash', (req, res) => {
  try {
    const { txnid, amount, productinfo, firstname, email, udf1, udf2 } = req.body;
    // Build hash string that includes udf1 and udf2 (bookingDates and guests)
    const hashString = `${PAYU_CONFIG.KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|||||||||${PAYU_CONFIG.SALT}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');
    res.json({ hash });
  } catch (error) {
    console.error('Hash generation error:', error);
    res.status(500).json({ error: 'Hash generation failed' });
  }
});

// Helper function: Convert stream to Buffer
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

// Helper function: Fetch S3 object as Buffer
async function getS3ObjectBuffer(bucket, key) {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  const response = await s3Client.send(command);
  return streamToBuffer(response.Body);
}

// Payment Success Endpoint: update booking status and send confirmation email
app.post('/property-api/paymentsuccess', async (req, res) => {
  console.log('Payment successful:', req.body);
  
  // Retrieve udf1 and udf2 for custom data (bookingDates and guests)
  const {
    bookingId,
    firstname,
    lastname,
    email,
    phone,
    productinfo,
    amount,
    udf1, // bookingDates sent as udf1
    udf2, // guests sent as udf2
    state,
    destination
  } = req.body;
  
  // Update booking status if bookingId exists
  if (bookingId) {
    try {
      await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed' });
      console.log("Booking record updated to confirmed.");
    } catch (error) {
      console.error("Error updating booking record:", error);
    }
  } else {
    console.error("No bookingId provided in payment success callback.");
  }
  
  const bookingDatesDisplay = udf1 || 'Booking Dates not specified';
  const totalCost = amount ? `₹${amount}` : '';
  const confirmationDate = new Date().toISOString().slice(0,10);
  
  // Define S3 bucket details (ensure your bucket and credentials are correct)
  const bucketName = 'assetsbackup';
  const logoKey = "assets/assets-2024-10-01/img/yuyiii-pink-logo.png";
  const bannerKey = "assets/assets-2024-10-01/img/confirm-email-banner.jpg";
  const calendarKey = "assets/assets-2024-10-01/img/amt-date-ico.png";
  const costKey = "assets/assets-2024-10-01/img/total-ico.png";
  const guestsKey = "assets/assets-2024-10-01/img/guest-ico.png";
  
  // Fetch the image buffers from S3
  let logoBuffer, bannerBuffer, calendarBuffer, costBuffer, guestsBuffer;
  try {
    logoBuffer = await getS3ObjectBuffer(bucketName, logoKey);
    bannerBuffer = await getS3ObjectBuffer(bucketName, bannerKey);
    calendarBuffer = await getS3ObjectBuffer(bucketName, calendarKey);
    costBuffer = await getS3ObjectBuffer(bucketName, costKey);
    guestsBuffer = await getS3ObjectBuffer(bucketName, guestsKey);
  } catch (err) {
    console.error("Error fetching images from S3:", err);
  }
  
  // Build the HTML email content referencing the inline attachments with cids
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Confirmation Voucher</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f5f5f5; font-family: Arial, sans-serif;">
        <table align="center" width="600" cellpadding="0" cellspacing="0" style="border:1px solid #ddd; background-color:#ffffff;">
          <!-- Yuyiii Logo -->
          <tr>
            <td align="center" style="padding:10px 0;">
              <img src="cid:yuyiii_logo" alt="Yuyiii Logo" style="display:block; max-width:150px;">
            </td>
          </tr>
          <!-- Top Banner Image -->
          <tr>
            <td style="padding:0;">
              <img src="cid:banner_image" alt="Top Banner" style="display:block; width:100%; border-bottom:1px solid #ddd;">
            </td>
          </tr>
          <!-- Heading & Subtitle -->
          <tr>
            <td style="padding:20px; text-align:center; color:#333;">
              <h2 style="margin:0 0 5px; font-size:20px; font-weight:600;">
                Hello ${firstname} ${lastname},
              </h2>
              <p style="margin:0; font-size:14px; color:#666;">
                Your host has approved your stay at ${productinfo} for INR ${amount}.<br>
              </p>
            </td>
          </tr>
          <!-- Pink Row: Date Range -->
          <tr>
            <td style="background-color:#DE1587; text-align:center; padding:20px;">
              <img src="cid:calendar_icon" alt="Calendar Icon" style="display:block; margin:0 auto 8px; width:30px; height:auto;">
              <p style="margin:0; font-size:16px; font-weight:600; color:#fff;">
                ${bookingDatesDisplay} 
              </p>
            </td>
          </tr>
          <!-- White Row: Total Cost & Guests -->
          <tr>
            <td style="padding:15px; background-color:#fff; text-align:center;">
              <table align="center" width="80%" cellpadding="0" cellspacing="0" style="margin:auto;">
                <tr>
                  <td align="center" valign="top" style="width:50%; padding:10px;">
                    <img src="cid:cost_icon" alt="Total Cost Icon" style="display:block; margin:0 auto 5px; width:30px; height:auto;">
                    <div style="font-size:14px; color:#333;">
                      <strong>${totalCost}</strong>
                    </div>
                    <div style="font-size:12px; color:#999;">Tariff + Tax</div>
                  </td>
                  <td align="center" valign="top" style="width:50%; padding:10px;">
                    <img src="cid:guests_icon" alt="Guests Icon" style="display:block; margin:0 auto 5px; width:30px; height:auto;">
                    <div style="font-size:14px; color:#333;">
                      <strong>${udf2}</strong>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Rooms & Rate Breakdown -->
          <tr>
            <td style="padding:20px; color:#333; font-size:14px;">
              <h3 style="margin:0 0 10px; font-weight:600; font-size:16px;">Rooms</h3>
              <p style="margin:0; font-weight:bold;">The Little Nell</p>
              <p style="margin:0 0 8px; color:#666;">Holi Rates</p>
              <p style="margin:0 0 12px; color:#666; line-height:1.5;">
                14 Mar - 15 Mar (Room + Breakfast)<br>
                18000 x 2 nights x 1 Room = ${amount}<br>
                18% IGST = ₹6480
              </p>
              <p style="margin:0; font-weight:bold;">Extra Bed Charges</p>
              <p style="margin:0 0 8px; color:#666;">Holi Rates</p>
              <p style="margin:0 0 12px; color:#666; line-height:1.5;">
                14 Mar - 15 Mar<br>
                2500 x 2 nights x 1 Room<br>
                18% IGST = ₹900
              </p>
              <p style="margin:0; font-weight:bold;">Extra Bed Taxes</p>
              <p style="margin:0 0 12px; color:#666; line-height:1.5;">
                18% IGST<br>
                ₹900
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:15px;">
                <tr>
                  <td align="right" style="font-size:12px; color:#999;">
                    ${confirmationDate}
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 10px; line-height:1.5;">
                Kindly make the payment by 5 PM. For 2 Adults your son of 13 years and your pet Pluto for 
                Check In - 14th March and Check Out - 16th March for Room with Breakfast.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                <tr>
                  <td align="left">
                    <a href="#" style="background-color:#DE1587; color:#fff; text-decoration:none; padding:10px 20px; border-radius:5px; font-size:14px;">
                      Make Payment
                    </a>
                  </td>
                  <td align="left" style="padding-left:10px;">
                    <a href="#" style="background-color:#eaeaea; color:#333; text-decoration:none; padding:10px 20px; border-radius:5px; font-size:14px;">
                      Cancel Booking
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 20px; font-size:13px; color:#666;">
                Please note, this payment link is valid only for the next 24 hours.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:15px; background-color:#fff; font-size:12px; color:#999; border-top:1px solid #ddd;">
              ©Yuyiii 2025
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
  
  // Prepare inline attachments using the buffers fetched from S3
  const attachments = [];
  if (logoBuffer) {
    attachments.push({
      filename: 'yuyiii-pink-logo.png',
      content: logoBuffer,
      cid: 'yuyiii_logo'
    });
  }
  if (bannerBuffer) {
    attachments.push({
      filename: 'confirm-email-banner.jpg',
      content: bannerBuffer,
      cid: 'banner_image'
    });
  }
  if (calendarBuffer) {
    attachments.push({
      filename: 'amt-date-ico.png',
      content: calendarBuffer,
      cid: 'calendar_icon'
    });
  }
  if (costBuffer) {
    attachments.push({
      filename: 'total-ico.png',
      content: costBuffer,
      cid: 'cost_icon'
    });
  }
  if (guestsBuffer) {
    attachments.push({
      filename: 'guest-ico.png',
      content: guestsBuffer,
      cid: 'guests_icon'
    });
  }
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
    debug: true,
    logger: true,
  });
  
  if (email) {
    try {
      await transporter.sendMail({
        from: `Yuyiii Company <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Booking Confirmation - Your Voucher',
        text: `Dear ${firstname} ${lastname},
Your booking at ${productinfo} for INR ${amount} has been confirmed.
Booking Dates: ${bookingDatesDisplay}
Guests: ${udf2}
Location: ${state}, ${destination}
Thank you for choosing Yuyiii.`,
        html: htmlContent,
        attachments: attachments
      });
      console.log('Confirmation email sent.');
    } catch (err) {
      console.error('Error sending email:', err);
    }
  }
  
  if (phone) {
    try {
      const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      await twilioClient.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${phone}`,
        body: `Dear ${firstname} ${lastname},
Your booking at ${productinfo} for INR ${amount} has been confirmed.
Booking Dates: ${bookingDatesDisplay}
Guests: ${udf2}
Location: ${state}, ${destination}
Thank you for choosing Yuyiii.`,
      });
      console.log('WhatsApp message sent.');
    } catch (err) {
      console.error('Error sending WhatsApp message:', err);
    }
  }
  
  res.redirect(303, '/paymentsuccess');
});

app.post('/property-api/paymentfailure', (req, res) => {
  console.log('Payment failed:', req.body);
  res.redirect(303, '/paymentfailure');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
