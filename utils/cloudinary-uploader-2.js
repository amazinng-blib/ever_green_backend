const cloudinaryUploaderOne = require('./cloudinary-uploader-1');

const cloudinaryUploaderTwo = async (files) => {
  try {
    let multiplePicturePromise = files.map(async (picture, index) => {
      const b64 = Buffer.from(picture.buffer).toString('base64');
      let dataURI = 'data:' + picture.mimetype + ';base64,' + b64;
      const cldRes = await cloudinaryUploaderOne(dataURI, index);
      return cldRes;
    });

    // BELOW RETURNS THE RESOLVED PROMISE OF MULTIPLEPICTUREPROMISE AS AN ARRAY OF OBJECT
    // THAT CAN BE MAPPED
    const imageResponse = await Promise.all(multiplePicturePromise);
    const imageUrl = imageResponse.map((image) => {
      const url = image.secure_url;
      return { url };
    });

    return imageUrl;
  } catch (error) {
    console.log({ error });
  }
};

module.exports = cloudinaryUploaderTwo;
