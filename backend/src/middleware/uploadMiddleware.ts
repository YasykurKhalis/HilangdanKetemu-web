import multer from 'multer';
import path from 'path';

// 1. Konfigurasi Penyimpanan
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // File akan disimpan di folder 'uploads/'
  },
  filename(req, file, cb) {
    // Format nama file: fieldname-tanggal-extensi (biar unik)
    // Contoh: image-123456789.jpg
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// 2. Filter File (Hanya boleh gambar)
function checkFileType(file: Express.Multer.File, cb: any) {
  const filetypes = /jpg|jpeg|png/; // Regex tipe file
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Hanya boleh upload gambar (jpg/jpeg/png)!');
  }
}

// 3. Inisialisasi Multer
const upload = multer({
  storage,
  limits: { fileSize: 2000000 }, // Batas file 2MB (Optional)
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export default upload;