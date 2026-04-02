export interface ShowtimeListResDto{
  cityName: string,
  cinemas: ShowtimeGroupByCity[]
}

export interface ShowtimeGroupByCinema{
  beginAt: string,
  endAt: string,
  id: number,
  movieName: string,
  roomName: string,
}

export interface ShowtimeGroupByCity{
  cinemaAddress: string,
  cinemaName: string,
  showtimes: ShowtimeGroupByCinema[]
}

export interface ShowtimeListReqDto{
  movieId: number,
  beginAt: string,
}