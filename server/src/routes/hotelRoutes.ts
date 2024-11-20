
import { Router } from 'express';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { HotelController } from '../controllers/hotelController';
import { validateHotelData, validateImageUpload } from '../middleware/validation';
import type { Request, Response, NextFunction } from 'express';
import { ALLOWED_IMAGE_FORMATS } from '../controllers/hotelController';

const router = express.Router();

type RoueHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void

const hotelController = new HotelController();


const storage = multer.diskStorage({
  destination: 'uploads/images/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname).toLowerCase());
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_IMAGE_FORMATS.includes(ext)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ 
  storage,
  fileFilter
});


router.get('/hotels', hotelController.getAllHotels);


router.post('/hotel', 
  validateHotelData as RoueHandler,
  hotelController.createHotel
);

router.get('/hotel/:hotelId', 
  hotelController.getHotel
);

router.put('/hotel/:hotelId', 
  validateHotelData as RoueHandler,
  hotelController.updateHotel
);


// Update the route handler to handle the return type properly
router.post(
  '/images',
  upload.array('images'),
  validateImageUpload as RoueHandler,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      await hotelController.uploadImages(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;