import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import type { Report } from '../types';

const Dashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'LOST' | 'FOUND'>('ALL');

  // Fetch data saat halaman dibuka
  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Jika filter 'ALL', ambil semua. Jika tidak, kirim param type
        const endpoint = filter === 'ALL' ? '/reports' : `/reports?type=${filter}`;
        const { data } = await API.get(endpoint);
        setReports(data);
      } catch (error) {
        console.error('Gagal ambil data', error);
      }
    };

    fetchReports();
  }, [filter]); // Jalankan ulang jika filter berubah

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto p-6">
        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {['ALL', 'LOST', 'FOUND'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filter === type 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              {type === 'ALL' ? 'Semua' : type === 'LOST' ? 'Barang Hilang' : 'Barang Ditemukan'}
            </button>
          ))}
        </div>

        {/* Grid Card Laporan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
              {/* Gambar Barang */}
              <div className="h-48 overflow-hidden bg-gray-200 relative">
                <span className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-full text-white ${
                  report.type === 'LOST' ? 'bg-red-500' : 'bg-green-500'
                }`}>
                  {report.type === 'LOST' ? 'HILANG' : 'DITEMUKAN'}
                </span>
                <img 
                  // PENTING: Tambahkan URL backend karena path di DB cuma "uploads/file.jpg"
                  src={`http://localhost:5000/${report.imageUrl}`} 
                  alt={report.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{report.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  📍 {report.location}
                </p>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">{report.description}</p>
                
                <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
                  <span>📅 {new Date(report.createdAt).toLocaleDateString()}</span>
                  <span>👤 {report.user.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reports.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Belum ada laporan barang.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;