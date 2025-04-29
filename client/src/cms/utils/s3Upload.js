// src/utils/s3Upload.js :contentReference[oaicite:0]{index=0}
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region          = import.meta.env.REACT_APP_AWS_REGION;
const accessKeyId     = import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const bucket          = import.meta.env.REACT_APP_AWS_S3_BUCKET;
const prefix          = import.meta.env.REACT_APP_AWS_S3_KEY_PREFIX;

const s3Client = new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });

export async function uploadToS3(folderName, file) {
  const key = `${prefix}/destination/${folderName}/${file.name}`;
  const putCmd = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: file.type });
  // get a short‐lived presigned PUT URL
  const url = await getSignedUrl(s3Client, putCmd, { expiresIn: 120 });
  // upload the binary directly
  const res = await fetch(url, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
  return file.name;
}
