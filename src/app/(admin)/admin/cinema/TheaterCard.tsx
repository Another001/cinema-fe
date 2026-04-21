import { Building2, Trash2, Plus } from 'lucide-react';
import RoomItem from './RoomItems';
import { RoomListRes } from '@/src/types/Cinema';


interface TheaterCardProps {
  name: string;
  location: string;
  phone: string;
  rooms: RoomListRes[];
  setSelectedCinema: React.Dispatch<React.SetStateAction<number | undefined>>
  cinemaId: number,
  setOpenCreateRoom: React.Dispatch<React.SetStateAction<boolean>>
}

const TheaterCard = ({ name, location, phone, rooms, setSelectedCinema, cinemaId , setOpenCreateRoom}: TheaterCardProps) => {
  return (
    <div className="bg-slate-800/60 border border-slate-400/15 rounded-[1.5rem] p-8 backdrop-blur-md animate-in slide-in-from-top-4 duration-300">
      <div className="flex justify-between items-start mb-6 border-b border-slate-400/10 pb-6">
        <div className="text-xl font-bold text-slate-200 flex items-center gap-3">
          <Building2 size={24} className="text-purple-500" />
          {name}
        </div>
        <button className="flex items-center gap-1 px-4 py-2 bg-red-500/15 border border-red-500/30 rounded-lg text-red-300 text-[0.85rem] transition hover:bg-red-500/25">
          <Trash2 size={16} />
          Xóa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border-b border-slate-400/10 pb-6">
        <div>
          <span className="text-[0.85rem] text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Địa Chỉ
          </span>
          <span className="text-slate-200 font-medium">{location}</span>
        </div>
        <div>
          <span className="text-[0.85rem] text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Số Điện Thoại
          </span>
          <span className="text-slate-200 font-medium">{phone}</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-[0.85rem] text-slate-400 uppercase tracking-wider font-semibold">
            Danh Sách Phòng Chiếu ({rooms.length})
          </div>
          <button
            onClick={() => {setSelectedCinema(cinemaId); setOpenCreateRoom(true)}}
            className="flex items-center gap-1 px-3 py-1.5 bg-purple-500/15 border border-purple-500/30 rounded-md text-purple-300 text-[0.85rem] transition hover:bg-purple-500/25">
            <Plus size={14} />
            Thêm Phòng
          </button>
        </div>

        {rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomItem key={room.roomId} name={room.roomName} capacity={100} format={room.roomType} />
          ))
        ) : (
          <p className="text-slate-400 text-[0.9rem]">Chưa có phòng nào</p>
        )}
      </div>
    </div>
  );
};

export default TheaterCard;