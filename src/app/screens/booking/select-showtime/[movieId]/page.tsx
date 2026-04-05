"use client";
import { use, useEffect, useState } from 'react';
import { format as formatDate, startOfToday } from 'date-fns';
import SelectionSummary from './SelectionSummary';
import ActionFooter from './ActionFooter';
import Calendar from './Calendar';
import ShowtimeSelector from './ShowtimeSelector';
import showtimeApi from '@/src/api/showtime';
import { ShowtimeListResDto } from '@/src/types/Showtime';
import movieApi from '@/src/api/movie';

export default function BookingPage({ params }: {params: Promise<{ movieId: number }>}) {
  const resolvedParams = use(params);
  const movieId = resolvedParams.movieId;
  const [selectedDate, setSelectedDate] = useState<string>(() => formatDate(startOfToday(), 'yyyy-MM-dd'));
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [data, setData] = useState<ShowtimeListResDto[]>();
  const [error, setError] = useState("");
  const [movieName, setMovieName] = useState("");
  const[showtimeId, setShowtimeId] = useState();
  useEffect(() => {
    const getData = async () =>{
      try{
        setError("");
        const beginDate = new Date(selectedDate);
        const res = await showtimeApi.listShowtime({movieId: movieId, beginAt: beginDate.toISOString()})
        setData(res);
        const res2 = await movieApi.getDetailMovie(movieId);
        setMovieName(res2.name);
      }
      catch{
        setError("Co loi luc tai du lieu");
      }
    }
    getData();
  },[movieId, selectedDate])


  const movieTitle = movieName;

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setSelectedCinema(null);
    setSelectedTime(null);
    setSelectedFormat(null);
  };

  const handleSelectShowtime = ({
    cinema,
    time,
    format,
  }: {
    cinema: string;
    time: string;
    format?: string | null;
  }) => {
    setSelectedCinema(cinema);
    setSelectedTime(time);
    setSelectedFormat(format ?? null);
  };

  const isReady = !!(selectedDate && selectedCinema && selectedTime);

  return (
    <div className="hero-bg text-white font-sans selection:bg-yellow-500/30">
      <div className="film-grain" />
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-black mb-8 italic" 
            style={{ fontFamily: "'Playfair Display', serif" }}>
          {movieTitle}
        </h1>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <SelectionSummary 
          date={selectedDate}
          cinema={selectedCinema}
          time={selectedTime}
          format={selectedFormat}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Cột trái: Calendar */}
          <div className="lg:col-span-1">
            <Calendar 
              selectedDate={selectedDate} 
              onSelectDate={handleSelectDate} 
            />
          </div>

          {/* Cột phải: Showtimes */}
          <div className="lg:col-span-2">
            <ShowtimeSelector 
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelect={handleSelectShowtime}
              showtimes={data}
              selectedCinema={selectedCinema}
              setShowtimeId={setShowtimeId}
            />
          </div>
        </div>

        <ActionFooter isReady={isReady} showtimeId={showtimeId ?? 0}/>
      </main>
    </div>
  );
}
