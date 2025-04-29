// s3image.route.js
import express from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const router = express.Router();

router.get('/s3image', async (req, res) => {
  try {
    const { destinationTitle, imageName } = req.query;
    if (!destinationTitle || !imageName) {
      return res.status(400).json({ error: 'Missing destinationTitle or imageName query parameters' });
    }

    // Construct S3 key using destination title (converted to lowercase) and image filename
    const folderName = destinationTitle.toLowerCase();
    const s3Key = `assets/assets-2025-03-16/img/destination/${folderName}/${imageName}`;
    const s3Uri = `s3://assetsbackup/${s3Key}`;

    // Validate S3 URI format
    const regex = /^s3:\/\/([^/]+)\/(.+)$/;
    const match = s3Uri.match(regex);
    if (!match) {
      return res.status(400).json({ error: 'Invalid S3 URI format' });
    }
    const [, bucket, key] = match;

    // Create S3 client (replace with your credentials or use environment variables)
    const s3Client = new S3Client({
      region: 'ap-south-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'YOUR_ACCESS_KEY',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'YOUR_SECRET_KEY'
      }
    });

    // Create the command to get the object from S3
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key
    });

    // Generate a presigned URL valid for 15 minutes (900 seconds)
    const url = await getSignedUrl(s3Client, command, { expiresIn: 900 });
    res.json({ imageUrl: url });
  } catch (err) {
    console.error('Error generating presigned URL:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
