'use client'

import {Ticket, PlayCircle} from 'lucide-react';
import { useState, useEffect } from 'react';
import movieApi from '@/src/api/movie';
import { MovieGetRes } from '@/src/types/Movie';
import ListMovie from '@/src/components/ListMovie';
import Link from 'next/link';
import MyLoading from '@/src/components/Loading';

function ShowMoreButton({link}: {link : string}){
  return(
    <Link href = {link} className="flex justify-center items-center border border-gray-300 hover:border-yellow-500 rounded-lg my-10 py-2">
      <p className='text-gray-300 text-lg font-bold'>Xem thêm</p>
    </Link>
  )
}

export default function HomePage() {
  const [movieNow, setMovieNow] = useState<MovieGetRes[]>([]);
  const [movieUpcoming, setMovieUpcoming] = useState<MovieGetRes[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getData = async () =>{
      try {
        const movienow = await movieApi.getNowMovie();
        setMovieNow(movienow);
        const movieupcoming = await movieApi.getUpcomingMovie();
        setMovieUpcoming(movieupcoming);
        setIsLoading(false);
      } catch (err) {
        setError(err as string);
      }
    }
    getData();
  },[])
    return (
      <div className="hero-bg text-white selection:bg-yellow-500/30 flex-1">
      <section className="relative z-10 px-12 py-20 flex flex-col md:flex-row items-center">
        <div className="max-w-2xl stagger-animation">
          <div className="flex items-center gap-2 mb-6" style={{ animationDelay: '0.1s' }}>
            <div className="w-8 h-[2px] bg-yellow-500"></div>
            <span className="text-yellow-500 text-sm font-semibold tracking-widest uppercase">Chào mừng đến với</span>
          </div>
          <h1 className="text-6xl font-black leading-tight mb-6 font-serif" style={{ animationDelay: '0.2s' }}>
            Trải nghiệm điện ảnh <br />
            <span className="text-yellow-500">đỉnh cao</span>
          </h1>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed" style={{ animationDelay: '0.3s' }}>
            Âm thanh Dolby Atmos • Màn hình IMAX 4K • Ghế ngồi Premium
          </p>
          <div className="flex gap-4" style={{ animationDelay: '0.4s' }}>
            <button className="px-8 py-3.5 rounded-full bg-yellow-500 text-black font-bold hover:brightness-110 transition flex items-center gap-2">
              <Ticket size={20} /> Mua vé ngay
            </button>
            <button className="px-8 py-3.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition flex items-center gap-2">
              <PlayCircle size={20} /> Xem trailer
            </button>
          </div>
        </div>
      </section>

      <section id="phim" className="relative z-10 px-12 pb-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold font-playfair">Phim đang chiếu</h2>
          <p className="text-gray-500 mt-1 text-sm">Những bộ phim hot nhất tại rạp</p>
        </div>
        {
          isLoading?(
            <MyLoading />
          ):(
            <div>
              <ListMovie movies={movieNow} type = 'now' isListAll={false} />
              <ShowMoreButton link="/movies/now-showing" />
            </div>
          )
        }
        
        <div className="flex items-center justify-between mb-10 mt-13">
          <div>
            <h2 className="text-3xl font-bold font-playfair">Sắp ra mắt</h2>
            <p className="text-gray-500 mt-1 text-sm">Những bom tấn sắp công chiếu</p>
          </div>
        </div>
        {isLoading?(
          <MyLoading />
        ):(
          <div>
            <ListMovie movies={movieUpcoming} type = 'coming' isListAll={false} />
            <ShowMoreButton link="/movies/cooming-soon" />
          </div>
        )}
          </section>
    </div>
  );
}