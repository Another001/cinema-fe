export interface RoomListRes{
  roomName: string,
  roomId: number,
}
export interface CinemaListRes{
  cinemaId: number,
  address: string,
  rooms: RoomListRes[]
}

export interface CityListRes{
  city: string,
  cinemas: CinemaListRes[]
}