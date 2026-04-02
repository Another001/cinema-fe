'use client';
import React, { useState, useEffect } from 'react';
import { Clapperboard, X, Tv, Clock, ArrowLeft, Check, AlertCircle } from 'lucide-react';

interface Seat {
  id: string;
  premium: boolean;
  sold: boolean;
  selected: boolean;
}

export default function SeatBooking({ movie, onBack }: { movie: any, onBack: () => void }) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const PRICES = { standard: 85000, premium: 120000 };

  useEffect(() => {
    const rows = 8;
    const cols = 12;
    const initialSeats: Seat[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        initialSeats.push({
          id: String.fromCharCode(65 + r) + (c + 1),
          premium: r >= 4,
          sold: Math.random() < 0.3,
          selected: false,
        });
      }
    }
    setSeats(initialSeats);
  }, []);

  const toggleSeat = (id: string) => {
    setSeats(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const selectedSeats = seats.filter(s => s.selected);
  const totalPrice = selectedSeats.reduce((sum, s) => sum + (s.premium ? PRICES.premium : PRICES.standard), 0);
  const seatTypes = Array.from(new Set(selectedSeats.map(s => s.premium ? 'Premium' : 'Standard'))).join(' + ');

  return (
    <div className="flex-1 flex flex-col hero-bg min-h-screen">
      <header className="relative z-50 border-b border-white/5 px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gold-bg flex items-center justify-center">
            <Clapperboard className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-wider font-playfair">STARLIGHT CINEMA</span>
        </div>
        <button onClick={() => setShowExitConfirm(true)} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center">
          <X className="w-5 h-5" />
        </button>
      </header>

      <main className="relative z-10 flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black mb-2 font-playfair">{movie.title}</h1>
            <div className="flex items-center justify-center gap-4 text-gray-400">
              <span className="flex items-center gap-2"><Tv className="w-4 h-4" /> Phòng 1 - IMAX 4K</span>
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 19:30</span>
            </div>
          </div>

          <div className="mb-12 text-center">
            <div className="w-full h-1.5 rounded-full mb-3 bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>
            <p className="text-gray-500 text-xs tracking-widest uppercase">MÀN HÌNH</p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-12 gap-3">
              {seats.map(seat => (
                <button
                  key={seat.id}
                  disabled={seat.sold}
                  onClick={() => toggleSeat(seat.id)}
                  className={`w-10 h-10 rounded-lg transition text-xs font-bold border-2 
                    ${seat.sold ? 'bg-red-500/50 cursor-not-allowed border-transparent' : 
                      seat.selected ? 'gold-bg text-black border-transparent' : 
                      'bg-gray-600 hover:bg-gray-500 text-white ' + (seat.premium ? 'border-purple-400/50' : 'border-transparent')}`}
                >
                  {seat.id}
                </button>
              ))}
            </div>
          </div>

          {/* Legend & Summary Logic... */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
              <p className="text-gray-500 text-xs uppercase mb-2">Ghế đã chọn</p>
              <p className="text-3xl font-bold">{selectedSeats.map(s => s.id).join(', ') || '-'}</p>
            </div>
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
              <p className="text-gray-500 text-xs uppercase mb-2">Tổng giá</p>
              <p className="text-3xl font-bold text-yellow-500">{totalPrice.toLocaleString('vi-VN')} đ</p>
            </div>
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
              <p className="text-gray-500 text-xs uppercase mb-2">Loại ghế</p>
              <p className="text-lg font-semibold">{seatTypes || '-'}</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={onBack} className="px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/5 flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" /> Quay lại
            </button>
            <button 
              disabled={selectedSeats.length === 0}
              onClick={() => setShowSuccess(true)}
              className="px-8 py-3.5 rounded-full gold-bg text-black font-bold hover:brightness-110 flex items-center gap-2 disabled:opacity-50"
            >
              <Check className="w-5 h-5" /> Tiếp tục thanh toán
            </button>
          </div>
        </div>
      </main>

      {/* Modals for Success and Exit would go here using conditional rendering */}
    </div>
  );
}