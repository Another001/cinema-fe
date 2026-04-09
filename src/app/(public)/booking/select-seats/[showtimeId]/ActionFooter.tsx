
import { X, ArrowRight } from 'lucide-react';

export default function ActionFooter({ canContinue, onContinue }: { canContinue: boolean, onContinue: () => void }) {
  return (
    <div className="flex justify-end gap-4">
      <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2 font-semibold">
        <X size={18} /> Hủy
      </button>
      <button 
        disabled={!canContinue}
        onClick={onContinue}
        className={`px-10 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold flex items-center gap-2 transition-all
          ${canContinue ? 'hover:scale-105 shadow-lg shadow-yellow-500/20' : 'opacity-40 cursor-not-allowed'}`}
      >
        Tiếp tục <ArrowRight size={18} />
      </button>
    </div>
  );
}