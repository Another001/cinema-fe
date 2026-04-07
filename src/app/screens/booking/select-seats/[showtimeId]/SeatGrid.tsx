import { ShowtimeListSeatResDto } from "@/src/types/Showtime";

interface SeatGridProps {
  selectedSeats: string[]; // Mảng chứa seatName (ví dụ: ["A1", "A2"])
  onToggleSeat: (seatName: string) => void;
  seats: ShowtimeListSeatResDto[]; // Nhận vào một mảng các object ghế
}

export default function SeatGrid({ selectedSeats, onToggleSeat, seats }: SeatGridProps) {
  return (
    <div className="grid grid-cols-10 gap-2 md:gap-3 max-w-2xl mx-auto p-4">
      {seats.map((seat) => {
        // Ghế đã có người ngồi nếu isSeatEmpty là false
        const isReserved = !seat.isSeatEmpty;
        // Kiểm tra ghế có đang được chọn hay không dựa trên seatName
        const isSelected = selectedSeats.includes(seat.seatName);

        return (
          <button
            key={seat.id} // Sử dụng ID từ database làm key
            disabled={isReserved}
            onClick={() => onToggleSeat(seat.seatName)}
            className={`
              aspect-square rounded-md text-[10px] font-bold transition-all border 
              flex items-center justify-center relative overflow-hidden
              ${
                isReserved
                  ? "bg-red-500/10 border-red-500/20 text-red-500/40 cursor-not-allowed"
                  : isSelected
                  ? "bg-gradient-to-br from-yellow-500 to-amber-600 border-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-110 z-10"
                  : seat.seatType=="Normal"
                  ? "bg-white/5 border-green-300/70 border-2 text-white/60 hover:border-yellow-500/50 hover:text-white"
                  : seat.seatType=="VIP"
                  ? "bg-white/5 border-yellow-300/70 border-2 text-white/60 hover:border-yellow-500/50 hover:text-white"
                  : "bg-white/5 border-pink-300/70 border-2 text-white/60 hover:border-yellow-500/50 hover:text-white"
              }
            `}
            title={`${seat.seatName} - ${seat.seatType}`}
          >
            {/* Hiển thị tên ghế (A1, A2...) */}
            {seat.seatName}

          </button>
        );
      })}
    </div>
  );
}