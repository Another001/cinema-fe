import { ShowtimeGroupByCinema } from "@/src/types/Showtime";
import { format } from 'date-fns';

export const ShowtimeCard = ({showtime} : {showtime: ShowtimeGroupByCinema}) => (
  <div className="group relative overflow-hidden rounded-xl border border-slate-400/15 bg-gradient-to-br from-purple-500/5 to-blue-500/5 p-4 cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/10 transition-all hover:-translate-y-0.5">
    {/* Thêm flex và items-center để dàn hàng ngang */}
    <div className="relative z-10 flex items-center gap-6">
      
      {/* Giờ chiếu - giữ vai trò điểm nhấn đầu tiên */}
      <div className="text-xl font-outfit font-extrabold text-purple-400 min-w-[70px]">
        {format(showtime.beginAt, "HH:mm")}-{format(showtime.endAt, "HH:mm")}
      </div>

      {/* Định dạng phim (2D/3D/IMAX...) */}
      <div className="text-[10px] font-outfit font-bold bg-blue-500/20 text-blue-400 px-2 py-1 rounded uppercase whitespace-nowrap">
        IMAX
      </div>

      {/* Tên phim - để flex-1 để nó chiếm không gian còn lại và đẩy các thành phần khác */}
      <div className="flex-1 font-outfit text-sm font-medium text-slate-200 line-clamp-1">
        {showtime.movieName}
      </div>

      {/* Số lượng ghế - đẩy về phía cuối */}
      <div className="text-sm font-outfit text-slate-300/70 whitespace-nowrap">
        100 ghế
      </div>
      
    </div>
  </div>
);