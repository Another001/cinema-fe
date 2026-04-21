export interface RoomListRes{
  roomName: string,
  roomId: number,
  roomType: string,
}
export interface CinemaListRes{
  cinemaId: number,
  address: string,
  name: string,
  rooms: RoomListRes[]
}

export interface CityListRes{
  city: string,
  cinemas: CinemaListRes[]
}

export interface CreateCinemaReq{
  city: string,
  name: string,
  address: string,
  phone: string,
}

export interface CreateRoomReq{
  name: string,
  cinemaId: number,
  roomStatusId: number,
  roomTypeId: number,
}