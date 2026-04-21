"use client";

import React from 'react';
import { 
  Lightbulb, 
  CheckCircle,
  X
} from 'lucide-react';
import { CreateCinemaReq } from '@/src/types/Cinema';
import cinemaApi from '@/src/api/cinema';
import MyLoading from '@/src/components/Loading';


const CreateCinema = ({setOpenCreateCinema, setIsLoading, isLoading} :{setOpenCreateCinema : React.Dispatch<React.SetStateAction<boolean>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, isLoading: boolean}) => {
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const data = Object.fromEntries(formData.entries());
    const payload : CreateCinemaReq = {
      name: data.name as string,
      city: data.city as string,
      phone: data.phone as string,
      address: data.address as string
    }
    console.log("payload", payload)
    try{
      await cinemaApi.createCinema(payload);
      alert("Tao rap thanh cong");
      setOpenCreateCinema(false);
    }
    catch{
      alert("Tao rap that bai")
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="create-bg text-white flex flex-col font-sans relative overflow-hidden items-center">
      {/* 1. Global Effects & Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');

        .create-bg {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0f172a 50%, #1a1a2e 75%, #0f172a 100%);
          position: relative;
        }

        .create-bg::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at 30% 50%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 20%, rgba(56, 189, 248, 0.06) 0%, transparent 40%);
          animation: drift 20s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-2%, 1%) rotate(1deg); }
        }

        .film-grain {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          z-index: 9999;
        }

        .logo-font {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 py-12 overflow-auto">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-[700px]">
            
            {/* PAGE TITLE */}
            <h1 className="logo-font text-4xl md:text-5xl font-black text-slate-200 mb-3 tracking-tight">
              Tạo Rạp Chiếu Phim Mới
            </h1>
            <p className="text-slate-400 text-[0.95rem] mb-8">
              Điền thông tin chi tiết để tạo một rạp mới trong hệ thống
            </p>

            {/* INFO BOX */}
            <div className="bg-sky-400/10 border border-sky-400/30 rounded-2xl p-6 mb-8 flex gap-4">
              <Lightbulb className="w-6 h-6 text-sky-300 shrink-0" />
              <p className="text-[0.9rem] text-slate-200 leading-relaxed">
                Nhập đầy đủ thông tin rạp bao gồm tên, địa chỉ, thành phố và số điện thoại liên hệ.
              </p>
            </div>

            {/* FORM CONTAINER */}
            <form action = {handleSubmit}
              className="bg-slate-800/60 border border-slate-400/15 rounded-[1.5rem] p-6 md:p-10 backdrop-blur-md">
              
              {/* Theater Name */}
              <div className="flex flex-col gap-2 mb-7">
                <label className="text-[0.9rem] text-slate-300 font-semibold uppercase tracking-wider">
                  Tên Rạp <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="VD: Rạp Starlight Tân Bình"
                  required
                  name="name"
                  className="p-4 bg-slate-900/60 border border-slate-400/20 rounded-xl text-slate-200 text-[0.95rem] focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-slate-500"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2 mb-7">
                <label className="text-[0.9rem] text-slate-300 font-semibold uppercase tracking-wider">
                  Địa Chỉ <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text"
                  required
                  name="address"
                  placeholder="VD: 123 Nguyễn Huệ, Tân Bình"
                  className="p-4 bg-slate-900/60 border border-slate-400/20 rounded-xl text-slate-200 text-[0.95rem] focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-slate-500"
                />
              </div>

              {/* City and Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.9rem] text-slate-300 font-semibold uppercase tracking-wider">
                    Thành Phố <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    name="city"
                    className="p-4 bg-slate-900/60 border border-slate-400/20 rounded-xl text-slate-200 text-[0.95rem] focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-slate-500"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.9rem] text-slate-300 font-semibold uppercase tracking-wider">
                    Số Điện Thoại <span className="text-red-400">*</span>
                  </label>
                  <input 
                    name = "phone"
                    type="tel" 
                    required
                    pattern="[0-9]*"
                    title="Vui lòng chỉ nhập số"
                    placeholder="VD: 0912345678"
                    className="p-4 bg-slate-900/60 border border-slate-400/20 rounded-xl text-slate-200 text-[0.95rem] focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              {isLoading ? (
                <div 
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(168,85,247,0.3)] active:translate-y-0"
                  >
                  <MyLoading />
                </div>
              ) : (
                <button 
                  type="submit" 
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(168,85,247,0.3)] active:translate-y-0"
                >
                  <CheckCircle size={20} />
                  Tạo Rạp
                </button>
              )}
              {
                !isLoading && (
                <button 
                  onClick={() => setOpenCreateCinema(false)}
                  className="w-full mt-3 py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(168,85,247,0.3)] active:translate-y-0 border border-gray-400"
                >
                  <X size={20} />
                  Hủy
                </button>
              )
              }
            </form>

          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCinema;