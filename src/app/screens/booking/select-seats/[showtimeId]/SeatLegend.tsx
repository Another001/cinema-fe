export default function SeatLegend() {
  const legendItems = [
    { 
      label: "Còn trống", 
      className: "bg-white/5 border-white/20" 
    },
    { 
      label: "Ghế bạn chọn", 
      className: "bg-gradient-to-br from-yellow-500 to-amber-600 border-yellow-500" 
    },
    { 
      label: "Đã bán", 
      className: "bg-red-500/20 border-red-500/40" 
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-3 text-sm text-white/70 font-medium">
          <div className={`w-6 h-6 rounded-md border ${item.className} shadow-sm`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}