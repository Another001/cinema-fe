export default function SeatLegend() {
  const legendItems = [
    { 
      label: "Thường", 
      className: "bg-white/5 border-green-300/70 border-2" 
    },
    { 
      label: "VIP", 
      className: "bg-white/5 border-yellow-300/70 border-2" 
    },
    { 
      label: "Sweetbox", 
      className: "bg-white/5 border-pink-300/70 border-2" 
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