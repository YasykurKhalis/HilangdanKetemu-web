import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold flex items-center gap-2">
          🔍 HilangdanKetemu!
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/add" className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-100">
            + Lapor Barang
          </Link>
          <button onClick={handleLogout} className="hover:text-gray-200">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;