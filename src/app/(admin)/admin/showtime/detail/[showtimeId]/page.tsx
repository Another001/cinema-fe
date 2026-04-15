'use client'

import {Inbox } from 'lucide-react';
import { useState, useEffect } from 'react';
import BookingCard from './BookingCard';
import { adminGetShowtime } from '@/src/types/Booking';
import bookingApi from '@/src/api/booking';
import { useParams } from 'next/navigation';


export default function CheckBookingsPage() {
  const [reservations, setReservations] = useState<adminGetShowtime[]>([]);
  const param = useParams();
  useEffect(() => {
    const getData = async () => {
      console.log("My param", param)
      const data = await bookingApi.adminGetShowtime(Number(param.showtimeId))
      console.log("my dataaa",data);
      setReservations(data);
    }
    getData();
  },[])
  return (
    <div className="min-h-screen bg-[#0f172a] text-white relative overflow-hidden font-sans">

      {/* Main Content */}
      <main className="relative z-10 flex-1 py-12">
        <div className="max-w-5xl mx-auto px-8">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black font-serif text-slate-200 mb-2 tracking-tight">
              Kiểm Tra Thông Tin Suất Chiếu
            </h1>
            <p className="text-slate-400 text-lg">Danh sách tất cả vé đã đặt</p>
          </div>

          {/* Booking List */}
          <div className="grid gap-6">
            {reservations.length > 0 ? (
              reservations.map((customer, index) => {
                return(
                <BookingCard
                  key={index}
                  customerName={customer.customerName}
                  phone={customer.customerPhone}
                  createdAt={customer.createdAt}
                  isConfirm={customer.isConfirm}
                  tickets={customer.customerReservation}
                />
              )})
            ) : (
              <div className="text-center py-20 bg-slate-800/40 rounded-[1.5rem] border border-slate-400/10 backdrop-blur-sm">
                <Inbox className="w-16 h-16 mx-auto mb-4 text-slate-600 opacity-50" />
                <p className="text-xl text-slate-400">Chưa có vé nào được đặt</p>
                <p className="text-slate-500 mt-2 text-sm">Dữ liệu vé sẽ hiển thị ở đây</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');
        
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-2%, 1%) rotate(1deg); }
        }

        body { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
}