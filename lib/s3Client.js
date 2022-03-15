import { S3Client } from "@aws-sdk/client-s3";

const REGION = process.env.NEXT_PUBLIC_S3_UPLOAD_REGION; //e.g. "us-east-1"

const creds = {
    accessKeyId: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET
};

// Create an Amazon S3 service client object.
const s3Client = new S3Client({
    region: REGION,
    credentials: creds 
});
export { s3Client };