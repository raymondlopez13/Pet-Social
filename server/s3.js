require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});
// uploads file to s3
function uploadFile(filename, createReadStream) {
    const uploadParams = {
        Bucket: bucketName,
        Body: createReadStream(),
        Key: filename,
        ACL: 'public-read'
    }

    return s3.upload(uploadParams).promise();
}

// downloads a file from s3
function getFile(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream();
}

function deleteFileS3(fileKey) {
    const params = {
        Bucket: bucketName,
        Key: fileKey
    }
    s3.deleteObject(params).promise();
}

exports.uploadFile = uploadFile;
exports.getFile = getFile;
exports.deleteFileS3 = deleteFileS3;