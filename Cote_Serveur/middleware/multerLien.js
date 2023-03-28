const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage }).single('icone');
module.exports=upload

