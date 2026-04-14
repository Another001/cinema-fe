import apiInstance from "./apiInstance";
import { ShowtimeListReqDto, ShowtimeListResDto, ShowtimeListSeatResDto, ShowtimeGetResDto, AdminShowtimeGroupByCity, AdminCreateShowtimeReq } from "../types/Showtime";

const showtimeApi = {
  listShowtime: ({ movieId, beginAt }: ShowtimeListReqDto): Promise<ShowtimeListResDto[]> => {
    return apiInstance.get('Showtime', {
      params: {
        movieId,
        beginAt
      }
    });
  },
  adminListShowtime:({beginAt, city}: ShowtimeListReqDto): Promise<AdminShowtimeGroupByCity[]> => {
    return apiInstance.get('Showtime/admin',{
      params:{
        beginAt,
        city
      }
    })
  },
  adminCreateShowtime:({movieId, roomId, beginAt, endAt, seatPrice}: AdminCreateShowtimeReq): Promise<AdminCreateShowtimeReq> => {
    return apiInstance.post('Showtime', {
      movieId, roomId, beginAt, endAt, seatPrice
    })
  },
  listSeats: (showtimeId: number) : Promise<ShowtimeListSeatResDto[]> =>{
    return apiInstance.get(`Booking/ShowtimeSeats/${showtimeId}`)
  },
  getShowtime: (showtimeId: number) : Promise<ShowtimeGetResDto> =>{
    return apiInstance.get(`Showtime/${showtimeId}`)
  }
};

export default showtimeApi;
