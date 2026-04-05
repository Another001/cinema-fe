import apiInstance from "./apiInstance";
import { ShowtimeListReqDto, ShowtimeListResDto, ShowtimeListSeatResDto, ShowtimeGetResDto } from "../types/Showtime";

const showtimeApi = {
  listShowtime: ({ movieId, beginAt }: ShowtimeListReqDto): Promise<ShowtimeListResDto[]> => {
    return apiInstance.get('Showtime', {
      params: {
        movieId,
        beginAt
      }
    });
  },
  listSeats: (showtimeId: number) : Promise<ShowtimeListSeatResDto[]> =>{
    return apiInstance.get(`Booking/ShowtimeSeats/${showtimeId}`)
  },
  getShowtime: (showtimeId: number) : Promise<ShowtimeGetResDto> =>{
    return apiInstance.get(`Showtime/${showtimeId}`)
  }
};

export default showtimeApi;
