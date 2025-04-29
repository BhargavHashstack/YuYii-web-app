// server/routes/images.js
import express from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
const router = express.Router();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId:   process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const BUCKET = process.env.AWS_S3_BUCKET;
const PREFIX = process.env.AWS_S3_KEY_PREFIX;

router.get('/presign', async (req, res) => {
  const { key } = req.query;
  if (!key) return res.status(400).json({ error: 'key query param required' });

  try {
    const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    const url = await getSignedUrl(s3, cmd, { expiresIn: 900 });
    res.json({ url });
  } catch (err) {
    console.error('Presign error:', err);
    res.status(500).json({ error: 'Could not presign URL' });
  }
});

export default router;
