'use client'

import FormSection from './FormSection';
import { RotateCcw, Plus } from 'lucide-react';
import movieApi from '@/src/api/movie';
import cinemaApi from '@/src/api/cinema';
import showtimeApi from '@/src/api/showtime';
import { useEffect, useState, useMemo } from 'react';
import { MovieGetRes } from '@/src/types/Movie';
import { CityListRes } from '@/src/types/Cinema';
import { addMinutes, format, parse } from 'date-fns';
import { combineToISO } from '@/src/utils/formatDate';
import { AdminCreateShowtimeReq } from '@/src/types/Showtime';


const handleSubmit = async ({movieId, roomId, beginAt, endAt, seatPrice} : AdminCreateShowtimeReq) => {
  const payload = {movieId, roomId, beginAt, endAt, seatPrice};
  console.log("my payloadddd", payload)
  try{
    await showtimeApi.adminCreateShowtime(payload);
    alert("Tao suat chieu thanh cong")
  }
  catch{
    alert("Tao suat chieu that bai");
  }
}

export default function AddShowtime() {
  const [movies, setMovies] = useState<MovieGetRes[]>([]);
  const [city, setCity] = useState<CityListRes[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieGetRes>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedCinema, setSelectCinema] = useState<string | null>();
  const [selectedRoom, setSelectRoom] = useState<number | null>();
  const [beginAt, setBeginAt] = useState<string>("")
  const [endAt, setEndAt] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>();
  const [normalPrice, setNormalPrice] = useState<number>(100000);
  const [vipPrice, setVipPrice] = useState<number>(150000);
  const [sweetBoxPrice, setSweetBoxPrice] = useState<number>(250000);

  useEffect(() => {
    const getData = async () => {
      const data = await cinemaApi.listCity();
      console.log("cityy",data);
      setCity(data);
      const data2 = await movieApi.getNowMovie();
      console.log("movie",data2);
      setMovies(data2);
    }
    getData();
  },[])
  const cinemaList = useMemo(() => city.find(x => x.city == selectedCity), [selectedCity]);
  const roomList = useMemo(() => cinemaList?.cinemas.find(x => x.address == selectedCinema),[selectedCinema]);
  return (
    <div className="min-h-screen bg-[#0f172a] text-white relative overflow-hidden font-sans">
      {/* Background Animation & Effects */}
      <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_30%_50%,rgba(168,85,247,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_70%_20%,rgba(56,189,248,0.06)_0%,transparent_40%)] animate-[drift_20s_ease-in-out_infinite]" />
      <main className="relative z-10 py-12 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black font-playfair text-slate-200 mb-2">
              Thêm Suất Chiếu Mới
            </h1>
            <p className="text-slate-400">
              Điền thông tin đầy đủ để thêm một suất chiếu mới vào hệ thống
            </p>
          </div>

          <form className="space-y-8">
            {/* Section 1: Movie Info */}
            <FormSection title="Thông Tin Phim" icon="Film">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Tên phim</label>
                <select className="input-style"
                  onChange={(e) => {
                    const value = e.target.value;
                    const movie = movies.find(x => x.id == Number(value))
                    setSelectedMovie(movie);
                  }}
                >
                  <option value="">-- Chọn phim --</option>
                  {movies.map((items => (
                    <option key = {items.id} value={items.id}>{items.name}</option>
                  )))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Ngày chiếu</label>
                <input type="date" className="input-style" onChange={(e) => setSelectedDate(e.target.value)}/>
              </div>
            </FormSection>

            {/* Section 2: Location */}
            <FormSection title="Vị Trí Rạp Chiếu" icon="Building2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Thành phố</label>
                <select className="input-style"
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectCinema(null);
                    setSelectRoom(null)
                  }}
                >
                  <option value="">-- Chọn thành phố --</option>
                  <option value="Ha Noi">Hà Nội</option>
                  <option value="Ho Chi Minh">TP HCM</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Rạp chiếu</label>
                <select className="input-style"
                  onChange={(e) => {setSelectCinema(e.target.value), setSelectRoom(null)}}
                >
                  <option value="">-- Chọn rạp --</option>
                  {
                  cinemaList?.cinemas.map(item => (
                    <option key = {item.cinemaId} value={item.address}>{item.address}</option>
                  ))
                  }
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Rạp chiếu</label>
                <select className="input-style"
                  onChange={(e) => {
                    const value = e.target.value;
                    console.log("room id luc t chon", value)
                    setSelectRoom(value === "" ? null : Number(value));
                  }}
                >
                  <option value="">-- Chọn phòng chiếu --</option>
                  {
                  roomList?.rooms.map(item => (
                    <option key = {item.roomId} value={item.roomId}>{item.roomName}</option>
                  ))
                  }
                </select>
              </div>
            </FormSection>

            {/* Section 3: Room & Time */}
            <FormSection title="Phòng & Giờ Chiếu" icon="DoorOpen">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Giờ chiếu</label>
                <input 
                  type="time" 
                  className="input-style"
                  value={beginAt ? beginAt.split('T')[1].substring(0, 5) : ""}
                  onChange={(e) => {
                    if(!selectedDate){
                      alert("Vui long chon ngay chieu truoc");
                      return
                    }
                    const beginDate = combineToISO(selectedDate || "2026-01-01", e.target.value)
                    setBeginAt(beginDate);
                    const endTimeDate = addMinutes(beginDate, selectedMovie?.duration || 30);
                    const isoEnd = format(endTimeDate, "yyyy-MM-dd'T'HH:mm:ss");
                    setEndAt(isoEnd);
                }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Cho đến</label>
                <input 
                  type="time" 
                  className="input-style" 
                  value={endAt ? endAt.split('T')[1].substring(0, 5) : ""}
                  onChange={(e) => {
                    if(!selectedDate){
                      alert("Vui long chon ngay chieu truoc");
                      return
                    }
                    setEndAt(format(combineToISO(selectedDate || "2026-01-01", e.target.value),"yyyy-MM-dd'T'HH:mm:ss"));
                  }}
                />
              </div>
            </FormSection>

            {/* Section 4: Pricing */}
            <FormSection title="Giá Vé" icon="Ticket">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Ghế Thường (₫)</label>
                <input type="number" placeholder="100000" maxLength={9} className="input-style" 
                  onChange={(e) => {setNormalPrice(Number(e.target.value))}}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Ghế VIP (₫)</label>
                <input type="number" placeholder="150000" maxLength={9} className="input-style" 
                onChange={(e) => {setVipPrice(Number(e.target.value))}}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Ghế Couple (₫)</label>
                <input type="number" placeholder="250000" maxLength={9} className="input-style"
                  onChange={(e) => {setSweetBoxPrice(Number(e.target.value))}}
                />
              </div>
            </FormSection>

            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-12">
              <button type="button" className="px-8 py-3.5 rounded-xl bg-slate-700/30 border border-slate-400/20 text-slate-300 font-bold hover:bg-slate-700/50 transition flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Xóa
              </button>
              <button type="button" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:translate-y-[-2px] hover:shadow-[0_10px_25px_rgba(168,85,247,0.3)] transition flex items-center justify-center gap-2"
                onClick={() => {
                  const payload : AdminCreateShowtimeReq = {
                    movieId: selectedMovie?.id || 0,
                    roomId: selectedRoom || 0,
                    beginAt: beginAt,
                    endAt: endAt,
                    seatPrice:[
                      {
                      seatTypeId: 1,
                      price: normalPrice
                      },
                      {
                      seatTypeId: 2,
                      price: vipPrice
                      },
                      {
                      seatTypeId: 3,
                      price: sweetBoxPrice
                      }
                    ]
                  }
                  handleSubmit(payload);
                }}
              >
                <Plus className="w-5 h-5" /> Thêm Suất Chiếu
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}