export interface CustomerFakeLoginReq{
  phone : string,
  password: string
}

export interface CustomerFakeLoginRes{
  id : number
  name : string,
  phone : string,
  role: string,
}

export interface TicketGetRes{
  movieName: string,
  name: string,
  roomName: string,
  seatName: string,
  createdAt: string,
  beginAt: string,
  seatPrice: number,
  ticketSatus: string
}