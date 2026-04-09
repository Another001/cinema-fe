import { X, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ActionFooter({ isReady, showtimeId }: { isReady: boolean, showtimeId: number }) {
  const router = useRouter();
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 border-t border-white/5 pt-8">
      <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 hover:border-yellow-500/50 transition flex items-center justify-center gap-2">
        <X className="w-4 h-4" /> Hủy
      </button>
      <button 
        disabled={!isReady}
        onClick={() => router.push(`/booking/select-seats/${showtimeId}`)}
        className={`px-10 py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all
          ${isReady 
            ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:scale-105 shadow-xl shadow-yellow-500/20' 
            : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
      >
        Tiếp tục <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}