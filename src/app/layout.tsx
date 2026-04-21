import type { Metadata } from "next";
// Thay đổi Geist thành Playfair_Display và Outfit
import { Playfair_Display, Outfit, Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["vietnamese"], 
  weight: [ "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

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
      <body className={`${playfair.variable} ${outfit.variable} ${roboto.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}