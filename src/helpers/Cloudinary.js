const coustomError = require("../../utils/coustomError");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dpminbaw5",
  api_key: "333942862231742",
  api_secret: "NnOysFey0EDOMNLLCA8ezEAOvQk",
});

exports.uploadCloudinaryFile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      auto: "format",
      quality: "auto",
      fetch_format: "auto",
      resource_type: "image",
    });
    //now optimize the img
    const url = await cloudinary.url(result.public_id, {
      resource_type: "Image",
    });
    fs.unlinkSync(filePath); // delete the local file after upload
    return url;
  } catch (error) {
    throw new coustomError(400, error.message);
  }
};

//delete file from cloudinary
exports.deleteCloudinaryFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result);
    if (result.result === "ok") {
      return "ok";
    } else {
      return "failed";
    }
  } catch (error) {
    console.log("error from cloudinary delete file", error);
    throw new coustomError(400, error.message);
  }
};
