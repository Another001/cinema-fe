'use client'

import { useState, useEffect } from 'react';
import { X, Clock, CreditCard, ShieldCheck } from 'lucide-react';
import { createReservationResDto } from '@/src/types/Booking';
import bookingApi from '@/src/api/booking';
import { useRouter } from 'next/navigation';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
  seats: string[];
  totalAmount: number;
  reservation?: createReservationResDto
}

const handleConfirmReservation = async ({reservationId, onClose}:{reservationId: number, onClose: any}) => {
  if (!reservationId) {
    return;
  }
  try {
    const response = await bookingApi.confirmReservation(reservationId);
    console.log("Reservation confirmed:", response);
    onClose();
  } catch (error: any) {
    console.error(error);
    
    const errorMessage = error.response?.data?.message 
      || error.message 
    alert(errorMessage);
  }
};


export default function PaymentModal({ isOpen, onClose, movieTitle, seats, totalAmount, reservation }: PaymentModalProps) {
  const [timeLeft, setTimeLeft] = useState(120);
  const router = useRouter();
  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(120);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() =>{ onClose(); }}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <button 
           className="text-xl font-bold italic" style={{ fontFamily: 'var(--font-playfair)' }}>
            Xác nhận thanh toán
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Timer Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded-full mb-2">
              <Clock size={16} className="animate-pulse" />
              <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
            </div>
            <p className="text-white/40 text-xs uppercase tracking-widest">Thời gian hoàn tất giao dịch</p>
          </div>

          {/* Ticket Info */}
          <div className="space-y-4 mb-8 bg-white/5 p-5 rounded-2xl border border-white/5">
            <div>
              <p className="text-white/40 text-[10px] uppercase font-bold mb-1">Phim</p>
              <p className="font-bold text-white leading-tight">{movieTitle}</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-white/40 text-[10px] uppercase font-bold mb-1">Chỗ ngồi</p>
                <p className="font-bold text-yellow-500">{seats.join(', ')}</p>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-[10px] uppercase font-bold mb-1">Số lượng</p>
                <p className="font-bold text-white">{seats.length} vé</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-end mb-8 px-2">
            <span className="text-white/60">Số tiền cần trả:</span>
            <span className="text-3xl font-black text-yellow-500 tracking-tight">
              {totalAmount.toLocaleString('vi-VN')} ₫
            </span>
          </div>

          {/* Payment Button */}
          <button onClick={async() => {await handleConfirmReservation({reservationId: reservation?.id?? 0, onClose: onClose}); router.replace("/screens/user/my-ticket")}}
           className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-extrabold rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-yellow-500/20">
            <CreditCard size={20} />
            THANH TOÁN NGAY
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-white/30 text-[10px] uppercase tracking-widest font-bold">
            <ShieldCheck size={14} />
            Giao dịch được bảo mật tuyệt đối
          </div>
        </div>
      </div>
    </div>
  );
}