import { format, addDays, startOfToday, getDay } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function Calendar({ selectedDate, onSelectDate }: any) {
  const today = startOfToday();
  
  // 1. Tính xem "Hôm nay" là thứ mấy (0 = CN, 1 = T2, ..., 3 = T4)
  const startDayOfWeek = getDay(today); 
  
  // 2. Tạo mảng 28 ngày như cũ
  const dates = Array.from({ length: 28 }).map((_, i) => addDays(today, i));

  // 3. Tạo một mảng "ô trống" dựa trên thứ của ngày đầu tiên
  // Ví dụ: Hôm nay là Thứ 4 (index = 3), mình cần 3 ô trống (CN, T2, T3) để đẩy Thứ 4 vào đúng cột 4.
  const emptySlots = Array.from({ length: startDayOfWeek });

  return (
    <div className="bg-white/5 border border-yellow-500/20 rounded-3xl p-6 backdrop-blur-md">
      <h3 className="text-lg font-semibold mb-4 text-white">Chọn ngày chiếu</h3>
      <div className="text-sm text-white/60 mb-4 pb-4 border-b border-white/10 italic">
        Tháng {format(today, 'MM, yyyy')}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {/* Vẽ Header Thứ */}
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-white/40 py-2">{d}</div>
        ))}
        
        {/* BƯỚC MỚI: Vẽ các ô trống để "đẩy" ngày đầu tiên về đúng cột */}
        {emptySlots.map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" /> 
        ))}
        
        {/* Vẽ các nút ngày như cũ */}
        {dates.map((date, i) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const isActive = selectedDate === dateStr;
          
          return (
            <button
              key={i}
              onClick={() => onSelectDate(dateStr)}
              className={`aspect-square rounded-xl text-sm font-medium transition-all border
                ${isActive 
                  ? 'bg-gradient-to-br from-yellow-500 to-amber-600 text-black border-yellow-500 shadow-lg shadow-yellow-500/20 scale-105' 
                  : 'bg-white/5 border-white/10 hover:border-yellow-500/50 text-white/70'
                }`}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}