import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Bật chế độ "standalone": khi chạy `next build`, Next.js sẽ gom
  // toàn bộ file cần thiết để chạy production vào thư mục `.next/standalone`
  // + file `server.js` gọn nhẹ. Dockerfile ở dưới sẽ chỉ copy thư mục này
  // nên image Docker sẽ rất nhẹ (không cần mang cả node_modules + source code).
  // (Xem docs: node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/output.md)
  output: "standalone",
};

export default nextConfig;
