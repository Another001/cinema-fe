interface Props { showtime: string; cinema: string; seats: string[]; total: number; }

export default function SelectionSummary({ showtime, cinema, seats, total }: Props) {
  const items = [
    { label: 'Suất chiếu', value: showtime },
    { label: 'Rạp phim', value: cinema },
    { label: 'Số ghế', value: seats.sort().join(', ') || '-' },
    { label: 'Tổng tiền', value: `${total.toLocaleString('vi-VN')} ₫` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6 backdrop-blur-md">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">{item.label}</span>
          <span className="text-yellow-500 font-bold text-sm md:text-base">{item.value}</span>
        </div>
      ))}
    </div>
  );
}