import axios from 'axios';

// Ganti URL ini jika nanti backend kamu deploy ke internet
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor: Otomatis pasang Token di setiap request (jika ada)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;