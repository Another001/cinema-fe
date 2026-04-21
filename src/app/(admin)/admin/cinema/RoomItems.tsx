interface RoomProps {
  name: string;
  capacity: number;
  format: string;
}

const RoomItem = ({ name, capacity, format }: RoomProps) => {
  return (
    <div className="bg-slate-900/50 border border-sky-400/20 rounded-xl p-4 mb-3">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-blue-200">{name}</span>
        <span className="px-3 py-1.5 bg-sky-400/15 border border-sky-400/30 rounded-md text-xs font-semibold text-sky-300">
          {format}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-[0.9rem]">
        <div>
          <span className="text-slate-400 block text-[0.8rem] uppercase mb-1 font-semibold tracking-wider">
            Sức Chứa
          </span>
          <span className="text-slate-200">{capacity} chỗ</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[0.8rem] uppercase mb-1 font-semibold tracking-wider">
            Định Dạng
          </span>
          <span className="text-yellow-400 font-semibold">{format}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;