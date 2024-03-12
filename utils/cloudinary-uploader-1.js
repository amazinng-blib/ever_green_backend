const cloudinary = require('../config/cloudinary');

const cloudinaryUploaderOne = async (file, index) => {
  const response = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });

  return response;
};

module.exports = cloudinaryUploaderOne;
