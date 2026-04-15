'use client'

import InputField from './InputField';
import FormSection from './FormSection';
import { RotateCcw, Plus } from 'lucide-react';
import movieApi from '@/src/api/movie';
import { MovieCreateReq } from '@/src/types/Movie';
import { useState } from 'react';
import MyLoading from '@/src/components/Loading';

export default function AddMoviePage() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const data = Object.fromEntries(formData.entries());
    const payload : MovieCreateReq = {
      director: data.director as string,
      name: data.name as string,
      title: data.title as string,
      describe: data.describe as string,
      duration: data.duration as number,
      releaseDate: data.releaseDate as string,
      endDate : data.endDate as string,
      genre: data.genre as string,
      cast: data.cast as string,
      figure: data.figure as string,
      language: data.language as string,
      trailer: data.trailer as string
    }
    console.log("payload", payload)
    try{
      const res = await movieApi.createMovie(payload);
      console.log(res);
      alert("Tao phim moi thanh cong")
    }
    catch{
      alert("Tao phim that bai")
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white relative overflow-hidden font-sans selection:bg-purple-500/30">

      <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_30%_50%,rgba(168,85,247,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_70%_20%,rgba(56,189,248,0.06)_0%,transparent_40%)] animate-[drift_20s_ease-in-out_infinite]" />
      <main className="relative z-10 py-12 px-8">
        <div className="max-w-4xl mx-auto">

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black font-playfair text-slate-200 mb-2">Thêm Phim Mới</h1>
            <p className="text-slate-400 text-lg font-playfair">Điền thông tin đầy đủ để thêm một bộ phim mới vào hệ thống</p>
          </div>

          <form className="space-y-8 relative" action={handleSubmit}>
            {
              loading &&(
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-[2px] rounded-[1.5rem] transition-all">
                  <div className="relative">
                    <MyLoading />
                  </div>
                </div>
              )
            }
            {/* Phần 1: Thông tin cơ bản */}
            <FormSection title="Thông Tin Cơ Bản" icon="Film">
              <InputField id="name" label="Tên phim" placeholder="VD: Dune Part Two" />
              <InputField id="genre" label="Thể loại" placeholder="VD: Hành động, Viễn tưởng" />
              <InputField id="language" label="Ngôn ngữ" placeholder="VD: Tiếng Anh" />
              <InputField id="title" label="Độ tuổi" placeholder="" />
            </FormSection>

            {/* Phần 2: Chi tiết phim */}
            <FormSection title="Chi Tiết Phim" icon="Info">
              <InputField id="director" label="Đạo diễn" placeholder="VD: Denis Villeneuve" type="string"/>
              <InputField id="duration" label="Thời lượng (phút)" type="number" placeholder="VD: 166" />
              <InputField id="cast" label="Diễn viên" isTextArea placeholder="VD: Timothée Chalamet, Zendaya..." className="md:col-span-2" />
              <InputField id="describe" label="Mô tả phim" isTextArea placeholder="Mô tả chi tiết nội dung..." className="md:col-span-2" />
            </FormSection>

            {/* Phần 3: Ngày & Truyền thông */}
            <FormSection title="Ngày Công Chiếu & Truyền Thông" icon="Calendar">
              <InputField id="releaseDate" label="Ngày công chiếu" type="date" />
              <InputField id="endDate" label="Ngày hết hạn chiếu" type="date" />
              <InputField id="figure" label="Hình ảnh (URL)" placeholder="VD: https://example.com/poster.jpg" />
              <InputField id="trailer" label="Trailer (URL)" placeholder="VD: https://youtube.com/watch?v=..." />
            </FormSection>

            {/* Nút hành động */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-12 pb-12">
              <button type="reset" className="px-8 py-3.5 rounded-xl bg-slate-700/30 border border-slate-400/20 text-slate-300 font-bold hover:bg-slate-700/50 transition flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Xóa
              </button>
              <button type="submit" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:translate-y-[-2px] hover:shadow-[0_10px_25px_rgba(168,85,247,0.3)] transition flex items-center justify-center gap-2"
                
              >
                <Plus className="w-5 h-5" /> Thêm Phim
              </button>
            </div>
          </form>
        </div>
      </main>

      <style jsx global>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-2%, 1%) rotate(1deg); }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Playfair+Display:wght@700;900&display=swap');
        
        body {
          font-family: 'Outfit', sans-serif;
        }

        h1, .font-serif {
          font-family: 'Playfair Display', serif;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}