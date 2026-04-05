'use client'

import { EmptyState } from "./EmptyState";
import { TicketCard } from "./TicketCard";
import { getCustomerInfo } from "@/src/utils/localStorage.utils";
import { useRouter } from "next/navigation";

const MOCK_DATA = [
  {
    movieTitle: "Dịch vụ giao hàng của phù thủy Kiki",
    cinemaName: "Starlight Cinema - Hà Nội",
    address: "Tầng 7, AEON MALL Hà Đông, Hà Nội",
    showtime: "14:00 - 15:30",
    format: "2D",
    seats: "A1, A2, A3",
    totalPrice: 360000,
    bookingDate: "15 tháng 3, 2024",
    status: "used" as const
  },
  {
    movieTitle: "Aquaman và Vương quốc dưới nước",
    cinemaName: "Starlight Cinema - TP HCM",
    address: "Tầng 5, Saigon Square, Quận 1, TP HCM",
    showtime: "19:00 - 21:15",
    format: "IMAX 3D",
    seats: "D5, D6",
    totalPrice: 320000,
    bookingDate: "20 tháng 3, 2024",
    status: "unused" as const
  }
];

export default function HistoryPage() {
  const user = getCustomerInfo();
  const router = useRouter();
  if(!user){
    router.replace("/screens/login");
  }
  return (
    <div className="hero-bg text-white overflow-x-hidden min-h-screen">
      <div className="film-grain"></div>
      <main className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl md:text-5xl font-black font-serif leading-tight text-white mb-12">
            Lịch sử đặt vé của tôi
          </h1>

          {MOCK_DATA.length > 0 ? (
            <div className="space-y-6">
              {MOCK_DATA.map((ticket, index) => (
                <TicketCard key={index} {...ticket} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}