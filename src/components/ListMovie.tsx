import MovieCard from "./MovieCard"
import { MovieGetRes } from "@/src/types/Movie"

export default function ListMovie({movies, type, isListAll} : {movies: MovieGetRes[], type : 'now' | 'coming', isListAll : boolean}){
  var listMovie = movies;
  if(!isListAll)
    listMovie = movies.slice(0,4)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {listMovie.map((movie, idx) => (
        <MovieCard key={idx}
          id = {movie.id}
          name={movie.name}
          genre={movie.genre}
          duration={movie.duration}
          releaseDate={movie.releaseDate}
          type={type}
          figure={movie.figure}
          />
      ))}
    </div>
  )
}