import multer from 'multer';
import path from 'path';
import { Request } from 'express';

interface MulterFile extends Express.Multer.File {
  fieldname: string;
  originalname: string;
  mimetype: string;
}

const UPLOAD_PATH = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: (req: Request, file: MulterFile, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req: Request, file: MulterFile, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const imageFilter = (req: Request, file: MulterFile, cb: multer.FileFilterCallback) => {

  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF files are allowed.'));
  }
};

export const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024, 
    files: 1 
  }
});

export const uploadImage = upload.single('profileImage');
