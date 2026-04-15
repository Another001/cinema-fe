import { UserCheck } from 'lucide-react';
import TicketItem from './TicketItem';
import { customerReservation } from '@/src/types/Booking';
import StatusBadge from './StatusBadge';
import {format} from 'date-fns'

interface BookingCardProps {
  customerName: string;
  phone: string;
  isConfirm: boolean,
  createdAt: string
  tickets: customerReservation[];
}

const BookingCard = ({ customerName, phone, tickets, isConfirm, createdAt }: BookingCardProps) => {
  return (
    <div className="bg-slate-800/60 border border-slate-400/15 rounded-[1.5rem] p-8 backdrop-blur-md animate-in slide-in-from-top-4 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-slate-400/10 gap-4">
        <div className="flex items-center gap-3 text-xl font-bold text-slate-200">
          <UserCheck className="text-purple-500" size={24} />
          {customerName}
        </div>
        <StatusBadge isConfirm={isConfirm} createdAt={createdAt}/>
      </div>
      <div className='flex justify-between'>
        <div className="flex flex-col gap-2 mb-6">
          <span className="text-[0.85rem] text-slate-400 uppercase tracking-wider font-semibold">Số Điện Thoại</span>
          <span className="text-slate-200 font-medium">{phone}</span>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <span className="text-[0.85rem] text-slate-400 uppercase tracking-wider font-semibold">Ngày đặt</span>
          <span className="text-slate-200 font-medium">{format(createdAt, 'HH:mm - dd/MM/yyyy')}</span>
        </div>
      </div>

      <div>
        <div className="text-[0.85rem] text-slate-400 uppercase tracking-wider mb-4 font-semibold">
          Danh Sách Vé ({tickets?.length})
        </div>
        {tickets?.map((ticket, index) => (
          <TicketItem 
            key={index}
            seat={ticket.seatName}
            seatType={ticket.seatType}
            bookingDate={"2026-01-01"}
            price={ticket.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingCard;