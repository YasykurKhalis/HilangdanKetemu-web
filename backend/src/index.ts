// src/index.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import path from 'path';
import reportRoutes from './routes/reportRoutes';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB(); // <--- Panggil ini

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(express.json()); // Supaya bisa baca JSON dari body request
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// JADIKAN FOLDER UPLOAD STATIC (Agar bisa diakses public)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Route sederhana untuk testing
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 HilangdanKetemu! Backend is running...');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});