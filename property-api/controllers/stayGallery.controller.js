// controllers/stayGallery.controller.js
import SelectedStay from '../models/selectedstay.model.js';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getStayGallery = async (req, res, next) => {
  try {
    const { stayId } = req.params;
    if (!stayId) {
      return res.status(400).json({ message: 'stayId parameter is required' });
    }

    // Find the SelectedStay document by its _id
    const selectedStay = await SelectedStay.findById(stayId);
    if (!selectedStay) {
      return res.status(404).json({ message: 'Selected Stay not found' });
    }

    // Convert gallery field to a plain object (handle Map or plain object)
    let galleryObj = {};
    if (selectedStay.gallery instanceof Map) {
      galleryObj = Object.fromEntries(selectedStay.gallery);
    } else if (typeof selectedStay.gallery === 'object' && selectedStay.gallery !== null) {
      galleryObj = selectedStay.gallery;
    }

    if (Object.keys(galleryObj).length === 0) {
      return res.status(404).json({ message: 'Gallery not found in Selected Stay' });
    }

    const destination = selectedStay.destination;
    if (!destination) {
      return res.status(400).json({ message: "Destination field is missing in Selected Stay" });
    }
    const folderName = destination.toLowerCase().replace(/ /g, "_");

    // Create an S3 client using your AWS credentials
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ,
      },
    });

    // Process gallery: for each category, generate a signed URL for each image filename
    const processedGallery = {};
    for (const [category, images] of Object.entries(galleryObj)) {
      processedGallery[category] = await Promise.all(
        images.map(async (imgRef) => {
          try {
            const s3Key = `assets/assets-2025-03-16/img/destination/${folderName}/${imgRef}`;
            const command = new GetObjectCommand({
              Bucket: process.env.AWS_S3_BUCKET,
              Key: s3Key,
            });
            const url = await getSignedUrl(s3Client, command, { expiresIn: 900 });
            return url;
          } catch (err) {
            console.error("Error fetching signed URL for image:", imgRef, err);
            return imgRef;
          }
        })
      );
    }

    return res.json({ gallery: processedGallery });
  } catch (error) {
    next(error);
  }
};
