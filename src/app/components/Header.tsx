'use client'

import { Clapperboard} from 'lucide-react';
import { getCustomerInfo } from '@/src/utils/localStorage.utils';
import { useEffect, useState } from 'react';

//min-h-screen hero-bg text-white selection:bg-yellow-500/30

export default function Header(){
  const [customerInfo, setCustomerInfo] = useState<any>(null);

  useEffect(() => {
    const data = getCustomerInfo(); 
    setCustomerInfo(data);
  }, []);
  console.log("my userrrrr",customerInfo);

  return(
    <nav className="relative z-50 flex items-center hero-bg text-white justify-between px-12 py-5 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
          <Clapperboard className="text-black" size={20} />
        </div>
        <span className="text-xl font-bold tracking-wider font-serif">STARLIGHT CINEMA</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        {customerInfo? (
          <p className="hover:text-yellow-500 transition">Xin chào {customerInfo?.name}</p>
        ):(
        <p className="hover:text-yellow-500 transition">Đăng nhập</p>
        )}
        <button className="px-5 py-2.5 rounded-full bg-yellow-500 text-black font-semibold text-sm hover:scale-105 transition shadow-[0_0_20px_rgba(234,179,8,0.3)]">
          Đặt vé ngay
        </button>
      </div>
    </nav>
  )
}