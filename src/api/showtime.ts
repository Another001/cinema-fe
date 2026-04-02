import apiInstance from "./apiInstance";
import { ShowtimeListReqDto, ShowtimeListResDto } from "../types/Showtime";

const showtimeApi = {
  listShowtime: ({ movieId, beginAt }: ShowtimeListReqDto): Promise<ShowtimeListResDto[]> => {
    return apiInstance.get('Showtime', {
      params: {
        movieId,
        beginAt
      }
    });
  }
};

export default showtimeApi;
