'use client'

import CinemaCard from './CinemaCard';
import { Building2 } from 'lucide-react';
import {useState, useEffect} from 'react';
import showtimeApi from '@/src/api/showtime';
import { AdminShowtimeGroupByCity } from '@/src/types/Showtime';
import MyLoading from '@/src/components/Loading';

export default function SchedulePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showtimes, setShowtimes] = useState<AdminShowtimeGroupByCity[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]); // Khởi tạo bằng ngày hôm nay
  const [city, setCity] = useState<string>("Ha Noi"); // Khởi tạo bằng giá trị đầu tiên của select
  useEffect(() => {
    setLoading(true); 
    const getData = async () =>{
      if(!date || !city){
        return;
      }
    try{
      const data = await showtimeApi.adminListShowtime({beginAt: date, city: city});
      setShowtimes(data);
      console.log(data);
    }
    catch{
    }
    finally{
      setLoading(false);
    }
    }
    getData();
  },[date, city])

  console.log("bine truynen vao show time", showtimes[0])
  return (
    <div className="min-h-screen schedule-bg text-white overflow-x-hidden font-['Outfit']">
      <div className="film-grain"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-playfair text-5xl font-black font-bold text-slate-200 mb-2">Lịch Chiếu Phim</h1>
          <p className="text-slate-400/70 text-lg">Chọn ngày để xem lịch chiếu phim tại các rạp của chúng tôi</p>
        </div>

        <div className='flex gap-12'>
          <div className="bg-slate-800/50 border border-slate-400/15 rounded-3xl p-6 backdrop-blur-md mb-12 max-w-xs">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2"> Chọn ngày </label>
            <input type="date" 
              className="w-full bg-slate-900/60 border border-slate-400/20 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-purple-500/50 transition-colors" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              /> 
          </div>

          {/* City Filter */}
          <div className="bg-slate-800/50 border border-slate-400/15 rounded-3xl p-6 backdrop-blur-md mb-12 max-w-xs text-whiten px-10">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Chọn thành phố
            </label>
            <select
              className="w-full font-outfit bg-slate-900/60 border border-slate-400/20 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-purple-500/50 transition-colors"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            >
              <option value="Ha Noi">Hà Nội</option>
              <option value="Ho Chi Minh">Hồ Chí Minh</option>
            </select>
          </div>
        </div>

        {/* City Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-purple-500/30">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-200">{city}</h2>
            </div>
          </div>
          {loading ? (
            <MyLoading />
          ) : showtimes.length > 0 ? (
            <div className="flex flex-col gap-8">
                <CinemaCard 
                  {...showtimes[0]}
                />
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400">
              Không tìm thấy lịch chiếu cho ngày này.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}