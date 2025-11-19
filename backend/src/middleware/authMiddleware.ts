import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

// Kita perlu memodifikasi Request agar bisa menyimpan data user
export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // 1. Cek apakah ada header Authorization dengan format "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Ambil tokennya saja (buang kata "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decoded = jwt.verify(token as string, process.env.JWT_SECRET || 'rahasia_negeri_api') as JwtPayload;

      // Cari user berdasarkan ID di token, simpan ke req.user
      // .select('-password') artinya jangan ambil data password
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Lanjut ke controller berikutnya
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token tidak valid, otorisasi gagal' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Tidak ada token, otorisasi ditolak' });
  }
};