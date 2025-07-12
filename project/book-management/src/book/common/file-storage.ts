import multer from 'multer';
import { mkdirSync } from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      mkdirSync('uploads', { recursive: true });
    } catch (e) {
      console.error('storage error', e);
    }
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export { storage };
