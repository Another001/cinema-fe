'use client'

import { Ticket, Info, User, Inbox } from 'lucide-react';
import BookingCard from './BookingCard';

// Dữ liệu mẫu (Sample data)
const allBookings = [
  {
    customer_name: "Nguyễn Văn A",
    phone: "0912345678",
    tickets: [
      { seat: "A1", status: "confirmed", booking_date: "15/01/2024", price: 150000 },
      { seat: "A2", status: "confirmed", booking_date: "15/01/2024", price: 150000 }
    ]
  },
  {
    customer_name: "Trần Thị B",
    phone: "0987654321",
    tickets: [
      { seat: "B5", status: "pending", booking_date: "14/01/2024", price: 150000 },
      { seat: "B6", status: "confirmed", booking_date: "14/01/2024", price: 150000 }
    ]
  }
];

export default function CheckBookingsPage() {
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
            {allBookings.length > 0 ? (
              allBookings.map((customer, index) => (
                <BookingCard 
                  key={index}
                  customerName={customer.customer_name}
                  phone={customer.phone}
                  tickets={customer.tickets}
                />
              ))
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