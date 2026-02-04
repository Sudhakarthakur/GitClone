const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env"),
});

const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-south-1",
    correctClockSkew: true,
});
const s3 = new AWS.S3();
const S3_BUCKET = "samplebucketbysudhakar"

module.exports = {
    s3,
    S3_BUCKET
}