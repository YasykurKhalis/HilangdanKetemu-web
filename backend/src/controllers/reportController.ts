import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Import interface custom tadi
import ItemReport from '../models/ItemReport';

// @desc    Buat laporan baru (Lost / Found)
// @route   POST /api/reports
// @access  Private (Harus Login)
export const createReport = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, category, location, type, date } = req.body;

    // Cek apakah ada file yang diupload
    if (!req.file) {
      res.status(400).json({ message: 'Wajib upload foto barang!' });
      return;
    }

    // Buat URL gambar (di Windows path pakai backslash \, kita ubah ke slash /)
    const imagePath = req.file.path.replace(/\\/g, "/");

    const report = await ItemReport.create({
      user: req.user._id, // Ambil ID user dari token
      title,
      description,
      category,
      location,
      type, // 'LOST' atau 'FOUND'
      date: date || Date.now(),
      imageUrl: imagePath, // Simpan path file di sini
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Ambil semua laporan
// @route   GET /api/reports
// @access  Public (Semua orang bisa lihat)
export const getReports = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Filter berdasarkan query params (opsional)
    // Contoh: /api/reports?type=LOST
    const keyword = req.query.type
      ? { type: req.query.type }
      : {};

    // Ambil data dari DB dan urutkan dari yang terbaru
    // .populate('user', 'name') -> Ambil nama user pemilik laporan
    const reports = await ItemReport.find(keyword)
        .populate('user', 'name email') 
        .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};