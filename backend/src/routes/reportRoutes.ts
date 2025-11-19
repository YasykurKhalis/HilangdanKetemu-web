import express from 'express';
import { createReport, getReports } from '../controllers/reportController';
import { protect } from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

// GET semua laporan (Public)
// POST laporan baru (Perlu Login & Upload Gambar)
router.route('/')
  .get(getReports)
  .post(protect, upload.single('image'), createReport); 
  // 'image' adalah nama field key di Postman nanti

export default router;