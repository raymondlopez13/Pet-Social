require('dotenv').config();
const S3 = require('aws-sdk/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
const secreteAccessKey = process.env.AWS_SECRET_KEY;

const s3 = S3({
    region,
    accessKeyId,
    secreteAccessKey
});
// uploads file to s3
export function uploadFile(file) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileSteam,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise();
}

// downloads a file from s3