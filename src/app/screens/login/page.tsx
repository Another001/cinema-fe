"use client";
import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, Clapperboard, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import customerApi from '@/src/api/customer';
import { CustomerFakeLoginReq } from '@/src/types/Customer';
import { setCustomerInfo } from '@/src/utils/localStorage.utils';

const handleLogin = async (
    { phone }: CustomerFakeLoginReq,
    setError: (msg: string) => void
  ) => {
  try {
    const customer = await customerApi.fakeLogin({ phone });
    alert("login successsss");
    setCustomerInfo(customer);
  } catch (ex) {
    setError("Đăng nhập thất bại");
  }
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string>("");

  return (
    <div className="hero-bg min-h-screen flex items-center justify-center p-6">
      <div className="film-grain" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-yellow-500/20 mb-4">
            <Clapperboard className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold tracking-widest text-white uppercase" 
              style={{ fontFamily: "'Playfair Display', serif" }}>
            STARLIGHT
          </h1>
          <p className="text-white/40 text-sm tracking-widest">CINEMA EXPERIENCE</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">Đăng nhập</h2>
          <p className="text-white/50 text-sm mb-8">Chào mừng bạn trở lại với điện ảnh!</p>

          <section className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-yellow-500 uppercase tracking-wider ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="string" 
                  placeholder="Your phone number"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Mật khẩu</label>
                <Link href="#" className="text-xs text-white/40 hover:text-yellow-500 transition">Quên mật khẩu?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold py-4 rounded-2xl shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] mt-4"
              onClick={async () => {await handleLogin({phone: phone}, setError)}}
            >
              Đăng nhập <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </section>
          {error?(
            <p className="text-red-400 mt-3">{error}</p>
          ):(
            <></>
          )}
          {/* Footer Social (Optional) */}
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-white/40 text-sm">Bạn chưa có tài khoản?</p>
            <Link href="#" className="text-white font-bold hover:text-yellow-500 transition underline underline-offset-4">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}