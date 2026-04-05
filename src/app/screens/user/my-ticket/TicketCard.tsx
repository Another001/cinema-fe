import { CheckCircle2, Ticket, Download } from 'lucide-react';

interface TicketProps {
  movieTitle: string;
  bookingDate: string;
  cinemaName: string;
  address: string;
  showtime: string;
  format: string;
  seats: string;
  totalPrice: number;
  status: 'used' | 'unused';
}

export const TicketCard = ({ 
  movieTitle, bookingDate, cinemaName, address, showtime, format, seats, totalPrice, status 
}: TicketProps) => {
  const isUsed = status === 'used';

  return (
    <div className="bg-white/5 border border-yellow-500/20 rounded-[1.5rem] p-8 backdrop-blur-md mb-6 transition-all hover:border-yellow-500/40 hover:bg-white/[0.03] hover:-translate-y-0.5">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 pb-4 border-b border-white/10 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{movieTitle}</h3>
          <p className="text-sm text-white/50">Đặt vào: {bookingDate}</p>
        </div>
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
          isUsed 
            ? 'bg-gray-500/10 border-gray-500/30 text-gray-400' 
            : 'bg-green-500/10 border-green-500/30 text-green-500'
        }`}>
          {isUsed ? <CheckCircle2 size={16} /> : <Ticket size={16} />}
          {isUsed ? 'Đã sử dụng' : 'Chưa sử dụng'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Rạp phim</span>
            <span className="text-yellow-500 font-bold">{cinemaName}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Địa chỉ</span>
            <span className="text-yellow-500 font-bold text-right ml-4">{address}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Suất chiếu</span>
            <span className="text-yellow-500 font-bold">{showtime}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Định dạng</span>
            <span className="text-yellow-500 font-bold">{format}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-6">
        <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Các ghế</span>
        <span className="text-white font-bold">{seats}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-white/10 gap-4">
        <div className="flex flex-col items-start w-full md:w-auto">
          <span className="text-[10px] text-white/50 uppercase tracking-widest">Tổng tiền</span>
          <span className="text-2xl font-black text-yellow-500">
            {totalPrice.toLocaleString('vi-VN')} ₫
          </span>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-yellow-500/30 rounded-xl text-yellow-500 font-semibold hover:bg-yellow-500/10 transition-all w-full md:w-auto justify-center">
          <Download size={16} />
          Tải vé
        </button>
      </div>
    </div>
  );
};