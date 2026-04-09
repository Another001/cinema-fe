import type { Metadata } from "next";
// Thay đổi Geist thành Playfair_Display và Outfit
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

// Font cho tiêu đề - Hỗ trợ Tiếng Việt cực chuẩn
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["vietnamese"], 
  weight: ["700", "800", "900"],
});

// Font cho nội dung - Hỗ trợ Tiếng Việt cực chuẩn
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["vietnamese"] as any,
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Starlight Cinema",
  description: "Hệ thống đặt vé xem phim chuyên nghiệp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`bg-[#0a0a0a] text-white ${playfair.variable} ${outfit.variable}`}>
        <div className = "text-lg font-playfair text-red-500">Hellluuu</div>
        <div className = "text-lg font-outfit text-black">Hellluuu</div>
        <div className="text-lg font-serif">Hellluuu</div>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}