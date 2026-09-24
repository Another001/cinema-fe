import axios from 'axios';

// SỬA-DEPLOY: đọc URL BE từ env NEXT_PUBLIC_API_URL thay vì hardcode localhost.
// Để làm gì: local là http://localhost:5102/api, deploy là https://xxx.trycloudflare.com/api hoặc URL Render.
// Lưu ý Next.js: biến NEXT_PUBLIC_* bị "đóng cứng" lúc docker build -> đổi URL là phải build lại image fe.
// CODE CŨ (giữ lại tham khảo, đừng xóa):
//   baseURL: 'http://localhost:5102/api',
const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5102/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiInstance;