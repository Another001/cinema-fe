'use client'

import movieApi from "@/src/api/movie"
import { useState, useEffect } from "react"
import { MovieGetRes } from "@/src/types/Movie"
import ListMovie from "../../../components/ListMovie";

export default function Page(){
  const [movies, setMovies] = useState<MovieGetRes[]>([]);
  useEffect(() => {
    const getData = async() => {
      const res = await movieApi.getNowMovie();
      setMovies(res);
    }
    getData();
  },[])
  return(
    <div className="min-h-screen hero-bg text-white selection:bg-yellow-500/30 px-12 py-8">
      <div className="flex flex-col mb-10">
        <h2 className="text-3xl font-bold font-serif">Phim đang chiếu</h2>
        <p className="text-gray-500 mt-1 text-sm">Những bộ phim hot nhất tại rạp</p>
      </div>
      <ListMovie movies={movies} type="now" isListAll={true} />
    </div>
  )
}