import {Ticket} from 'lucide-react';
import Link from 'next/link';

interface MovieProps {
  id: number;
  name: string;
  genre: string;
  duration: number;
  releaseDate: string;
  type: 'now' | 'coming';
  figure: string
}

export default function MovieCard({id, name, genre, duration, releaseDate, type, figure }: MovieProps) {
  console.log("prop co giiiii",{ name, genre, duration, releaseDate, type, figure } )
  return (
    <Link href = {`/movies/detail/${id}`} >
    <div className="group rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] min-h-[450] max-w-[400]">
      <div className="relative h-72 flex items-center justify-center overflow-hidden" >
        <img 
          src={figure} 
          alt="Poster" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {type === 'now' ? (
          <>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="px-5 py-2.5 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center gap-2">
                <Ticket size={16} /> Đặt vé
              </button>
            </div>
          </>
        ) : (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white text-xs font-semibold">
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl mb-1">{name}</h3>
        <div className="flex">
          <p className="text-gray-300 text-xs font-bold shrink-0">Thể loại:</p>
          <p className="text-gray-500 text-xs mb-1 pl-1">{genre}</p>
        </div>
        <div className="flex">
          <p className="text-gray-300 text-xs font-bold shrink-0">Thời lượng:</p>
          <p className="text-gray-500 text-xs mb-1 pl-1">{duration}</p>
          <p className="text-gray-500 text-xs mb-1 pl-1">phút</p>
        </div>
        <div className="flex">
          <p className="text-gray-300 text-xs font-bold shrink-0">Khởi chiếu:</p>
          <p className="text-gray-500 text-xs mb-3 pl-1">{releaseDate?.slice(0,10)}</p>
        </div>
      </div>
    </div>
    </Link>
  );
}