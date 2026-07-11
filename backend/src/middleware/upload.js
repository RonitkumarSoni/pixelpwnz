import multer from 'multer';
import config from '../config.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.maxFileSize,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.originalname.toLowerCase().endsWith('.txt')) {
      const err = new Error('Invalid file type. Only .txt files are accepted.');
      err.statusCode = 400;
      return cb(err, false);
    }
    cb(null, true);
  },
});

export default upload;
