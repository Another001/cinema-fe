'use client'

import MovieInfo from "./MovieInfor";
import MovieTabs from "./Tab";
import movieApi from "@/src/api/movie";
import { useState, useEffect, use } from "react";
import { MovieGetRes } from "@/src/types/Movie";

export default function Page({ params }: {params: Promise<{ id: number }>}) {
  const resolvedParams = use(params); 
  const id = Number(resolvedParams.id);
  console.log("ID lấy từ URL là:", id);
  const [movieDetail, setMovieDetail] = useState<MovieGetRes>();
  useEffect(() => {
    const getData = async () =>{
      const res = await movieApi.getDetailMovie(id);
      setMovieDetail(res);
      console.log('dataaaaaa', res);
    }
    getData();
  },[])
  return (
    <div className="min-h-screen hero-bg flex flex-col">
      <div className="film-grain" />

      <main className="relative z-10 flex-1 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] items-start">
            <div className="flex flex-col justify-center w-92 aspect-[3/4] rounded-3xl overflow-hidden border border-yellow-500/20 shadow-2xl relative group">
              <img src = {movieDetail?.figure} alt="figure" className="w-full h-full object-cover"/>
            </div>

            <MovieInfo movie={movieDetail}/>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

          <MovieTabs movie={movieDetail}/>
        </div>
      </main>
    </div>
  );
}