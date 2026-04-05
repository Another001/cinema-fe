import { Ticket, Plus } from 'lucide-react';

export const EmptyState = () => (
  <div className="text-center py-16 px-8">
    <Ticket className="w-20 h-20 mx-auto mb-6 opacity-30 text-white" />
    <h2 className="text-2xl font-bold text-white/80 mb-2">Bạn chưa có vé nào</h2>
    <p className="text-white/50 mb-8">Bắt đầu đặt vé ngay để thưởng thức những bộ phim yêu thích</p>
    <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full text-black font-bold hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(234,179,8,0.3)] transition-all">
      <Plus size={18} />
      Đặt vé ngay
    </button>
  </div>
);