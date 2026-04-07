'use client'

import { Clapperboard, LogOut, Ticket, ChevronDown, User } from 'lucide-react';
import { getCustomerInfo } from '@/src/utils/localStorage.utils';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {deleteCustomerInfo } from '@/src/utils/localStorage.utils';

export default function Header() {
  const router = useRouter()
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  useEffect(() => {
    const data = getCustomerInfo();
    setCustomerInfo(data);
  }, []);
  const handleLogout = () => {
    deleteCustomerInfo();
    setCustomerInfo(null);
    router.replace("/screens/login");
  };

  return (
    <nav className="sticky top-0 z-[100] flex items-center hero-bg text-white justify-between px-12 py-5 border-b border-white/5">
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)]">
          <Clapperboard className="text-black" size={20} />
        </div>
        <span className="text-xl font-bold tracking-wider font-serif">STARLIGHT CINEMA</span>
      </div>

      {/* RIGHT NAVIGATION */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {customerInfo ? (
          /* CONTAINER CHO HOVER */
          <div className="relative group py-2">
            {/* TÊN NGƯỜI DÙNG */}
            <div className="flex items-center gap-2 cursor-pointer text-gray-300 group-hover:text-yellow-500 transition-colors">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                <User size={16} />
              </div>
              <span>Xin chào, {customerInfo?.name}</span>
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </div>

            {/* DROPDOWN MENU */}
            <div className="absolute top-full right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-[110]">
              <div className="bg-[#1a1a1a]/95 backdrop-blur-xl border border-yellow-500/20 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                
                {/* Lựa chọn: Xem vé */}
                <Link href="/screens/user/my-ticket" className="flex items-center gap-3 px-5 py-4 hover:bg-yellow-500/10 hover:text-yellow-500 transition-colors border-b border-white/5">
                  <Ticket size={18} />
                  <span className="font-semibold">Xem vé của tôi</span>
                </Link>

                {/* Lựa chọn: Đăng xuất */}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-500/10 text-red-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="font-semibold">Đăng xuất</span>
                </button>
              </div>
              
              {/* Miếng đệm để không bị mất hover khi di chuột từ tên xuống menu */}
              <div className="absolute -top-2 left-0 w-full h-2"></div>
            </div>
          </div>
        ) : (
          <Link href="/login" className="text-gray-300 hover:text-yellow-500 transition">
            Đăng nhập
          </Link>
        )}

        {/* NÚT ACTION */}
        <button className="px-6 py-2.5 rounded-full bg-yellow-500 text-black font-bold text-sm hover:scale-105 transition shadow-[0_0_20px_rgba(234,179,8,0.3)] active:scale-95">
          Đặt vé ngay
        </button>
      </div>
    </nav>
  );
}