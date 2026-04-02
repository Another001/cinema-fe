import { MapPin } from 'lucide-react';
import { ShowtimeListResDto } from '@/src/types/Showtime';
import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';


const CITY = [
  { cityName: "Ha Noi" },
  { cityName: "Ho Chi Minh" }
]

interface Props {
  selectedDate: string | null;
  selectedTime: string | null;
  onSelect: (selection: {
    cinema: string;
    time: string;
    format?: string | null;
  }) => void;
  showtimes?: ShowtimeListResDto[];
  selectedCinema: string | null;
}

export default function ShowtimeSelector({ selectedDate, selectedTime, onSelect, showtimes, selectedCinema }: Props) {
  const [city, setCity] = useState<string>("Ha Noi");
  const [roomName, setRoomName] = useState<string>("");
  const selectedCity = useMemo(() => {
    const filter = showtimes?.find((item) => item.cityName === city);
    return filter?.cinemas;
  },[city, showtimes])
  if (!selectedDate) {
    return (
      <div className="bg-white/5 border border-yellow-500/20 rounded-3xl p-12 flex items-center justify-center text-white/40 italic">
        Vui lòng chọn ngày để xem suất chiếu
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-yellow-500/20 rounded-3xl p-6 backdrop-blur-md">
      <div>Chọn địa chỉ rạp</div>
      <div className="flex flex-row gap-4 mt-3">
        {CITY.map(City =>(
          <button
            key={City.cityName}
            onClick={() => setCity(City.cityName)}
            className={`flex flex-col items-center py-3 rounded-2xl border transition-all px-2 py-3
              ${city === City.cityName
                ? 'bg-yellow-500 border-yellow-500 text-black font-bold' 
                : 'bg-white/5 border-white/10 hover:border-yellow-500/50'
              }`}
          >
            <span className="text-base">{City.cityName}</span>
          </button>
        ))}
      </div>
        
      </div>
      {selectedCity?.map(cinema => (
        <div key={cinema.cinemaName} className="bg-white/5 border border-yellow-500/20 rounded-3xl p-6 backdrop-blur-md">
          <div className="mb-4">
            <h4 className="text-yellow-500 font-bold text-lg">{cinema.cinemaName}</h4>
            <div className="flex items-center gap-2 text-xs text-white/50 mt-1">
              <MapPin className="w-3 h-3" />
              {cinema.cinemaAddress}
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {cinema?.showtimes.map((slot) => {
              const slotLabel = format(parseISO(slot.beginAt), "HH:mm");

              return (
                <button
                  key={slot.id}
                  onClick={() => {
                    onSelect({
                      cinema: cinema.cinemaName,
                      time: slot.beginAt,
                    });
                    setRoomName(slot.roomName);
                  }}
                  className={`flex flex-col items-center py-3 rounded-2xl border transition-all
                  ${selectedTime === slot.beginAt && selectedCinema === cinema.cinemaName && roomName === slot.roomName
                    ? 'bg-yellow-500 border-yellow-500 text-black font-bold' 
                    : 'bg-white/5 border-white/10 hover:border-yellow-500/50'
                  }`}
                >
                  <span className="text-base">{slotLabel}</span>
                  <span className="text-xs">{slot.roomName}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
