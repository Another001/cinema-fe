// components/MovieTabs.tsx
'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { MovieGetRes } from '@/src/types/Movie';

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return "";
  
  // Regex này giúp lấy ID từ cả link watch?v= và link rút gọn youtu.be/
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11) 
    ? `https://www.youtube.com/embed/${match[2]}`
    : url;
};

export default function MovieTabs({movie} : {movie?: MovieGetRes}) {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="mt-12">
      <div className="flex border-b border-white/5 mb-8">
        {['details', 'trailer', 'reviews'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 font-bold transition-relative ${
              activeTab === tab ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-white/60 hover:text-white'
            }`}
          >
            {tab === 'details' ? 'Chi tiết' : tab === 'trailer' ? 'Trailer' : 'Đánh giá'}
          </button>
        ))}
      </div>

      <div className="min-h-[300px]">
        {activeTab === 'details' && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-serif mb-4 text-white">Nội dung cốt truyện</h2>
            <p className="text-white/80 leading-relaxed max-w-4xl">
              {movie?.describe}
            </p>
          </div>
        )}

        {activeTab === 'trailer' && (
          <div className="aspect-video w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 animate-in zoom-in-95 duration-500">
            {
              movie?.trailer?
              (
                <iframe
                className="w-full h-full"
                src={getYouTubeEmbedUrl(movie?.trailer)}
                allowFullScreen
                />    
              ):
              (<></>)  
            }
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid gap-6 animate-in slide-in-from-bottom-4 duration-500">
             {[1, 2].map(i => (
               <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold">Người dùng {i === 1 ? 'A' : 'B'}</span>
                    <span className="text-xs text-white/40">vừa xong</span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className={`w-4 h-4 ${index < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
                    ))}
                  </div>
                  <p className="text-white/70 italic">"Phim cực kỳ ý nghĩa, màu sắc và âm nhạc tuyệt vời!"</p>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}