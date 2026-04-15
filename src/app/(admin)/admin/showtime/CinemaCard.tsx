import { MapPin, Ticket, DoorOpen } from 'lucide-react';
import { ShowtimeCard } from './ShowtimeCard';
import { AdminShowtimeGroupByCity } from '@/src/types/Showtime';
import Link from 'next/link';


export default function CinemaCard  (showtimes : AdminShowtimeGroupByCity) 
  {
  console.log("showtime truyen cua bo", showtimes); 
  
  return(
  <div className="relative overflow-hidden rounded-3xl border border-slate-400/15 bg-slate-800/60 p-8 backdrop-blur-md transition-all hover:border-purple-500/30 hover:bg-slate-800/80 hover:-translate-y-1 before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-purple-500 before:to-blue-500 before:opacity-0 hover:before:opacity-100">
    <div className="flex items-center gap-3 text-lg font-extrabold text-slate-200 mb-3">
      <Ticket className="w-5 h-5 text-purple-400" />
      {showtimes?.cityName}
    </div>
    {showtimes?.cinemas?.map((cinema => (
      <div key = {cinema.cinemaAdress}>
        <div className="flex items-start gap-3 text-sm text-slate-400 mb-6 leading-relaxed">
          <MapPin className="w-4 h-4 mt-1 shrink-0 text-blue-500" />
          <div>{cinema.cinemaAdress}</div>
        </div>

        {cinema?.rooms?.map((room => (
          <div key = {room.roomName} className="bg-slate-900/50 border border-slate-400/10 rounded-2xl p-6">
            <div className="flex items-center mb-5 pb-4 border-b border-slate-400/10">
              <div className="flex items-center gap-3 font-bold text-slate-200">
                <DoorOpen className="w-5 h-5 text-blue-500" />
                {room.roomName}
              </div>
            </div>
            {room?.showtimes?.map((showtime => (
              <Link className="flex flex-col gap-3" key = {showtime.id} href={`showtime/detail/${showtime.id}`}>
                <ShowtimeCard showtime = {showtime} />
              </Link>
            )))
            }
          </div>
        )))
        }
      </div>
    )))
    }
  </div>
)};