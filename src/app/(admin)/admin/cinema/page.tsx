'use client'

import cinemaApi from "@/src/api/cinema"
import { useEffect, useMemo, useState } from "react";
import { Plus, Inbox } from 'lucide-react';
import TheaterCard from './TheaterCard'
import { CityListRes } from "@/src/types/Cinema";
import CreateCinema from "./CreateCinema";
import MyLoading from "@/src/components/Loading";
import CreateRoom from "./CreateRoom";

export default function TheaterManagementPage() {
  const [data, setData] = useState<CityListRes[]>([]);
  const [openCreateCinema, setOpenCreateCinema] = useState<boolean>(false)
  const [openCreateRoom, setOpenCreateRoom] = useState<boolean>(false)
  const [selectedCity, setSelectedCity] = useState<string>("Hà Nội");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedCinema, setSelectedCinema] = useState<number|undefined>();
   useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      try{
        const data = await cinemaApi.listCity(selectedCity);
        //console.log(data)
        setData(data);
      }
      catch{
        
      }
      finally{
        setIsLoading(false)
      }
    }
    getData();
  },[selectedCity])
  const selectedCinemaName = useMemo(() => {const nowCinema = data[0]?.cinemas?.find(x => x.cinemaId == selectedCinema); return nowCinema?.name}, [selectedCinema])
  return (
    <div className="min-h-screen bg-[#0f172a] text-white relative overflow-hidden font-sans">
      {openCreateCinema ?  (<CreateCinema setOpenCreateCinema = {setOpenCreateCinema} setIsLoading={setIsLoading} isLoading={isLoading}/>
      ): openCreateRoom ? ( 
        <CreateRoom setOpenCreateRoom = {setOpenCreateRoom} setIsLoading={setIsLoading} isLoading={isLoading} nowCinema={selectedCinemaName} selectedCinema={selectedCinema}/>
      ) :
      (
      <main className={`relative z-10 flex-1 py-12 overflow-auto ${openCreateCinema ? "blur-sm" : "blur-0"}`}>
        <div className="max-w-5xl mx-auto px-8">
          
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black font-serif text-slate-200 mb-2 tracking-tight">
              Quản Lý Rạp Chiếu Phim
            </h1>
            <p className="text-slate-400 text-lg">Tạo và quản lý các rạp cùng với các phòng chiếu</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-400/15 rounded-3xl p-6 backdrop-blur-md mb-12 max-w-xs text-whiten px-10">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Chọn thành phố
            </label>
            <select
              className="w-full font-outfit bg-slate-900/60 border border-slate-400/20 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-purple-500/50 transition-colors"
              onChange={(e) => setSelectedCity(e.target.value)}
              value={selectedCity}
            >
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            </select>
          </div>

          {/* Add Theater Button */}
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-bold transition transform hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(168,85,247,0.3)] active:translate-y-0 mb-8"
            onClick={() => setOpenCreateCinema(true)}
          >
            <Plus size={20} />
            Thêm Rạp Mới
          </button>

          {/* Results Container */}
          {isLoading ? (
            <MyLoading />
          ) : (
            <div className="grid gap-6">
              {data.length > 0 ? (
                data[0].cinemas.map((theater) => (
                  <TheaterCard 
                    key={theater.cinemaId}
                    name={theater.name}
                    location={theater.address}
                    phone="01234567"
                    rooms={theater.rooms}
                    setSelectedCinema={setSelectedCinema}
                    cinemaId = {theater.cinemaId}
                    setOpenCreateRoom={setOpenCreateRoom}
                  />
                ))
              ) : (
                <div className="text-center py-20 bg-slate-800/40 rounded-[1.5rem] border border-slate-400/10 backdrop-blur-sm">
                  <Inbox className="w-16 h-16 mx-auto mb-4 text-slate-600 opacity-50" />
                  <p className="text-xl text-slate-400">Chưa có rạp nào</p>
                  <p className="text-slate-500 mt-2 text-sm">Nhấn "Thêm Rạp Mới" để bắt đầu</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      )}

      {/* Global CSS Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');
        
        body { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
}