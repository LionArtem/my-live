const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cd) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');
    cd(null, `${date}-${file.originalname}`);
  },
});

const uploads = multer({
  storage,
  fileFilter(req, file, collback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
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
