"use client";
import React, { useState, use } from 'react';
import SelectionSummary from './SelectionSummary';
import SeatGrid from './SeatGrid';
import ActionFooter from './ActionFooter';
import SeatLegend from './SeatLegend';
import showtimeApi from '@/src/api/showtime';
import { ShowtimeListSeatResDto, ShowtimeGetResDto } from '@/src/types/Showtime';
import { format } from 'date-fns';
import PaymentModal from './PaymentModal';
import bookingApi from '@/src/api/booking';
import { getCustomerInfo } from '@/src/utils/localStorage.utils';
import { createReservationReqDto, createReservationResDto } from '@/src/types/Booking';
import Loading from '../../../../components/Loading'


const getSelectedSeatsForApi = (
  selectedSeats: string[],                   
  seats: ShowtimeListSeatResDto[]
): { seatId: number }[] => {
  
  return seats
    .filter(seat => selectedSeats.includes(seat.seatName))
    .map(seat => ({ 
      seatId: seat.id 
    }));
};

export function calculateTotalPrice(
  selectedSeatNames: string[],
  seatPrices: { seatType: string; price: number }[],
  allSeats: { seatName: string; seatType: string; isSeatEmpty: boolean }[]
): number {

  // Tạo Map để tra cứu giá theo seatType (string)
  const priceMap = new Map(
    seatPrices.map(item => [item.seatType, item.price])
  );

  let total = 0;

  for (const seatName of selectedSeatNames) {
    const seat = allSeats.find(s => s.seatName === seatName);

    if (seat) {
      const price = priceMap.get(seat.seatType);
      if (price !== undefined) {
        total += price;
      }
    }
  }

  return total;
}

console.log(getCustomerInfo());

export default function BookingPage({ params }: {params: Promise<{ showtimeId: number }>}) {
  const resolvedParams = use(params);
  const showtimeId = resolvedParams.showtimeId;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<ShowtimeListSeatResDto[]>([]);
  const [showtimeDetail, setShowtimeDeatail] = useState<ShowtimeGetResDto>();
  const [reservation, setReservation] = useState<createReservationResDto>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  React.useEffect(() => { 
    const getData = async () => {
      const data = await showtimeApi.listSeats(showtimeId ?? 0);
      console.log(data);
      setSeats(data);
      const data2 = await showtimeApi.getShowtime(showtimeId);
      console.log('showtimedetail', data2);
      setShowtimeDeatail(data2);
      setIsLoading(false);
    }
    getData();
  },[]);
  const totalPrice = calculateTotalPrice( selectedSeats,showtimeDetail?.seatPrices ?? [],seats);
  const seatIds = getSelectedSeatsForApi(selectedSeats, seats);
  console.log('seat idddd', seatIds);

  return (
    <div className="min-h-screen hero-bg text-white font-[family-name:var(--font-outfit)]">
      <div className="film-grain"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-black mb-8 italic" 
            style={{ fontFamily: 'var(--font-playfair)' }}>
          {showtimeDetail?.movieName}
        </h1>

        <SelectionSummary 
          showtime={format(new Date(showtimeDetail?.beginAt ?? "2026-04-02T17:23:58.223"), 'HH:mm')}
          cinema={showtimeDetail?.cinemaAddress ?? "Cgv"}
          seats={selectedSeats}
          total={totalPrice}
        />
        <div className="mt-16 mb-8 text-center">
          <p className="text-white/50 uppercase tracking-widest text-xs mb-4">Màn hình phim</p>
          <div className="w-full max-w-md h-1.5 mx-auto rounded-full bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent shadow-[0_4px_12px_rgba(234,179,8,0.2)]"></div>
        </div>

        <div className="text-center mb-8">
          Bạn đã chọn: <strong className="text-yellow-500 text-xl">{selectedSeats.length}</strong> ghế
        </div>

        <SeatLegend />
        {isLoading?(
          <Loading />
        ):(
          <SeatGrid 
            selectedSeats={selectedSeats} 
            onToggleSeat={(label) => {
              setSelectedSeats(prev => 
                prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
              );
            }}
            seats={seats} 
          />
        )}
        

        <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-8 text-center max-w-sm mx-auto my-12 backdrop-blur-md">
          <p className="text-white/60 text-sm mb-1">Tổng tiền cần thanh toán</p>
          <p className="text-4xl font-black text-yellow-500">
            {(totalPrice).toLocaleString('vi-VN')} ₫
          </p>
        </div>

        <ActionFooter canContinue={selectedSeats.length > 0} 
          onContinue={async() => {
            
            console.log("bodyyyy", {showtimeId: showtimeDetail?.id ?? 0, seats: seatIds ?? [], customerId: getCustomerInfo().id  })
            const newreservation = await bookingApi.createReservation({showtimeId: showtimeDetail?.id ?? 0, seats: seatIds ?? [], customerId: getCustomerInfo().id  })
            console.log("reservationnnnn", newreservation);
            setReservation(newreservation)
            setIsModalOpen(true)}} /> 
      </main>
      <PaymentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movieTitle={showtimeDetail?.movieName ?? ""}
        seats={selectedSeats}
        totalAmount={totalPrice}
        reservation={reservation}
      />
    </div>
  );
}