import apiInstance from "./apiInstance";
import { MovieCreateReq, MovieGetRes } from "../types/Movie";

const movieApi = {
  getNowMovie: () : Promise<MovieGetRes[]> => {
    return apiInstance.get('/Movie/Now');
  },
  getUpcomingMovie: () : Promise<MovieGetRes[]> => {
    return apiInstance.get('Movie/Upcoming');
  },
  getDetailMovie: (id : number) : Promise<MovieGetRes> => {
    return apiInstance.get(`Movie/${id}`);
  },
  createMovie:(movie : MovieCreateReq) => {
    return apiInstance.post('Movie', movie)
  }
};

export default movieApi;