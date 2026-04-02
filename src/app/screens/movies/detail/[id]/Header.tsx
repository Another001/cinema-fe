// components/Header.tsx
import { ArrowLeft, Clapperboard, Share2, Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative z-50 border-b border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 rounded-full hover:bg-white/10 flex items-center justify-center transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
            <Clapperboard className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-wider font-serif">STARLIGHT CINEMA</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-12 h-12 rounded-full hover:bg-white/10 flex items-center justify-center transition">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-full hover:bg-white/10 flex items-center justify-center transition">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}