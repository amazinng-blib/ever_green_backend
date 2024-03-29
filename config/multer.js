const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    filetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb({ message: 'Unsupported file format' }, false);
  }
};

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
