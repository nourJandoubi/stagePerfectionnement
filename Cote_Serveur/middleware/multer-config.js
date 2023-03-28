
///
const multer = require('multer');

const MIME_TYPES = {
  'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'documents');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage }).single('docurl');
module.exports = upload