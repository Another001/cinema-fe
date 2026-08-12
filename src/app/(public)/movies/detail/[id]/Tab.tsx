// components/MovieTabs.tsx
'use client';
import { useEffect, useState } from 'react';
import { MovieGetRes } from '@/src/types/Movie';
import {format} from 'date-fns'
import { SendHorizonal } from 'lucide-react';
import { useAuthContext } from '@/src/context/AuthContext';
import movieApi from '@/src/api/movie';

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
  const [comment, setComment] = useState<string>();
  const {user} = useAuthContext();
  const handleComment = async () =>{
    if(!user){
      alert("Bạn phải đăng nhập để bình luận")
      return
    }
    if(!comment)
      return
    try{
      await movieApi.createComment({movieId : movie?.id || 0, customerId: user.id, comment: comment});
      setComment("");
    }
    catch{

    }
  }
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
            <h2 className="text-2xl font-playfair mb-4 text-white">Nội dung cốt truyện</h2>
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
            <div className="relative w-full">
              <style>{`
                .hide-scroll::-webkit-scrollbar { display: none; }
                .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
              `}</style>

              <textarea 
                className="hide-scroll w-full p-6 pr-16 rounded-2xl border border-white/5 bg-white/20 text-white/70 italic focus:outline-none resize-none" 
                placeholder='Viết bình luận...' 
                rows={2}
                onChange={(e) => setComment(e.target.value)}
                value = {comment}
              />
              <button className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all active:scale-90"
                onClick={handleComment}
              >
                <SendHorizonal className="w-4 h-4" />
              </button>
            </div>
             {movie?.comments.map((item , index) => (
               <div key={index} className="p-6 rounded-2xl border border-white/5 bg-white/20 backdrop-blur-sm">
                  <div className="flex items-center gap-5 mb-3">
                    <span className="font-bold">{item.customerName}</span>
                    <span className="text-xs text-white/40">{format(item.createdAt, "yyyy-MM-dd")}</span>
                  </div>
                  <p className="text-white/70 italic">{item.comment}</p>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}