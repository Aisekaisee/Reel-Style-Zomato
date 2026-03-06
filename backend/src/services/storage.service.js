const ImageKit = require("@imagekit/nodejs");
const path = require("path");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  timeout: 30000,
});

async function uploadFile(file, fileName) {
  if (!file) {
    throw new Error("No file buffer provided for upload");
  }

  const extension = path.extname(fileName) || ".mp4";
  const finalFileName = fileName.endsWith(extension)
    ? fileName
    : `${fileName}${extension}`;

  // Convert Buffer into a File-like object expected by @imagekit/nodejs v7 upload API.
  const uploadableFile = await toFile(file, finalFileName);

  const result = await client.files.upload({
    file: uploadableFile,
    fileName: finalFileName,
  });

  return result;
}

module.exports = {
  uploadFile,
};
