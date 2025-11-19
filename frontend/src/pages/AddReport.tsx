import React, { useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AddReport = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  
  // State Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Umum');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('LOST');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle file dipilih
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // Buat preview gambar lokal
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert('Wajib upload foto!');

    setLoading(true);

    // PENTING: Gunakan FormData untuk upload file
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('type', type);
    formData.append('image', imageFile); // Key harus 'image' sesuai backend

    try {
      // Header 'Content-Type': 'multipart/form-data' otomatis diatur oleh Axios jika pakai FormData
      await API.post('/reports', formData);
      alert('Laporan berhasil dibuat!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Gagal membuat laporan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📝 Buat Laporan Baru</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Pilihan Tipe */}
            <div className="flex gap-4 mb-4">
              <label className={`flex-1 p-3 text-center cursor-pointer rounded border ${type === 'LOST' ? 'bg-red-50 border-red-500 text-red-600 font-bold' : 'border-gray-200'}`}>
                <input type="radio" name="type" value="LOST" className="hidden" checked={type === 'LOST'} onChange={(e) => setType(e.target.value)} />
                🔴 Barang Hilang
              </label>
              <label className={`flex-1 p-3 text-center cursor-pointer rounded border ${type === 'FOUND' ? 'bg-green-50 border-green-500 text-green-600 font-bold' : 'border-gray-200'}`}>
                <input type="radio" name="type" value="FOUND" className="hidden" checked={type === 'FOUND'} onChange={(e) => setType(e.target.value)} />
                🟢 Barang Ditemukan
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Judul Barang</label>
              <input type="text" className="w-full p-2 border rounded mt-1" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea className="w-full p-2 border rounded mt-1" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                <select className="w-full p-2 border rounded mt-1" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Elektronik</option>
                  <option>Dompet/Tas</option>
                  <option>Kunci</option>
                  <option>Dokumen</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                <input type="text" className="w-full p-2 border rounded mt-1" placeholder="Contoh: Kantin Pusat" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>
            </div>

            {/* Upload Gambar */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition relative">
              <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              {preview ? (
                <img src={preview} alt="Preview" className="h-40 mx-auto object-contain" />
              ) : (
                <div className="text-gray-500">
                  <p>Klik untuk upload foto barang</p>
                  <p className="text-xs mt-1">(Wajib JPG/PNG)</p>
                </div>
              )}
            </div>

            <button 
              disabled={loading}
              className={`w-full py-3 rounded text-white font-bold ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Mengupload...' : 'Kirim Laporan'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReport;