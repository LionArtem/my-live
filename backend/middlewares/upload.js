const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cd) {
    cd(null, req.user._id);
  },
});

const uploads = multer({
  storage,
  fileFilter(req, file, collback) {
    if (
      file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg'
    ) {
      collback(null, true);
    } else {
      console.log('only jpg & png file supported!');
      collback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = uploads;
