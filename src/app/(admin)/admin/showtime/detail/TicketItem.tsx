import StatusBadge from "./StatusBadge";

interface TicketItemProps {
  seat: string;
  status: 'confirmed' | 'pending';
  bookingDate: string;
  price: number;
}

const TicketItem = ({ seat, status, bookingDate, price }: TicketItemProps) => {
  return (
    <div className="bg-slate-900/50 border border-purple-500/20 rounded-xl p-4 mb-3">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-blue-200">Ghế: <strong className="text-white text-lg">{seat}</strong></span>
        <StatusBadge status={status} />
      </div>
      <div className="grid grid-cols-2 gap-4 text-[0.9rem]">
        <div>
          <span className="text-slate-400 block text-[0.8rem] uppercase mb-1">Ngày Đặt</span>
          <span className="text-slate-200">{bookingDate}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[0.8rem] uppercase mb-1">Giá Vé</span>
          <span className="text-yellow-400 font-bold">{price.toLocaleString('vi-VN')} ₫</span>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;