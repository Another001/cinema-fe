// components/MovieInfo.tsx
import { Star, Ticket, Bell, Share2 } from 'lucide-react';
import { MovieGetRes } from '@/src/types/Movie';
import { useRouter } from 'next/navigation';

const infoItems = [
  { label: 'Đạo diễn', value: 'Hayao Miyazaki' },
  { label: 'Diễn viên', value: 'Voice actors' },
  { label: 'Thể loại', value: 'Hoạt hình' },
  { label: 'Khởi chiếu', value: '10/04/2026' },
  { label: 'Thời lượng', value: '103 phút' },
  { label: 'Ngôn ngữ', value: 'Tiếng Nhật - Lồng tiếng Việt' },
  { label: 'Xếp hạng', value: 'P - Phim được phép phổ biến' },
];

function RenderItems({label, value}: {label?: string, value?: string}){
  return(
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  )
}

export default function MovieInfo({movie} : {movie?: MovieGetRes}) {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl md:text-4xl font-black font-serif mb-6 leading-tight text-white">
        {movie?.name}
      </h1>
      <p className="text-white/80 leading-relaxed mb-8 text-lg">
        {movie?.title}
      </p>

      <div className="flex gap-3 mb-8">
        <span className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
          <Star className="w-3.5 h-3.5 fill-black" /> IMAX
        </span>
        <span className="bg-white/5 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold">HD</span>
        <span className="bg-white/5 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold">4K</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mb-8 pb-8 border-b border-white/5">
        <RenderItems label = "Đạo diễn" value = {movie?.director} />
        <RenderItems label = "Diễn viên" value = {movie?.cast} />
        <RenderItems label = "Thể loại" value = {movie?.genre} />
        <RenderItems label = "Khởi chiếu" value = {movie?.releaseDate.slice(0,10)} />
        <RenderItems label = "Ngôn ngữ" value = {movie?.language} />
      </div>

      <div className="flex flex-wrap gap-4">
        <button
        onClick={() => router.push(`/screens/booking/select-showtime/${movie?.id}`)}
        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3.5 rounded-full font-bold flex items-center gap-2 hover:-translate-y-0.5 transition shadow-lg shadow-yellow-500/20">
          <Ticket className="w-5 h-5" /> Đặt vé ngay
        </button>
        <button className="bg-transparent border border-white/20 hover:border-yellow-400 px-6 py-3.5 rounded-full font-bold flex items-center gap-2 transition text-white">
          <Bell className="w-5 h-5 color-white" /> Nhắc tôi
        </button>
      </div>
    </div>
  );
}