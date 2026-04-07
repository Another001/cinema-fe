export interface CustomerFakeLoginReq{
  phone : string
}

export interface CustomerFakeLoginRes{
  id : number
  name : string,
  phone : string,
}

export interface TicketGetRes{
  movieName: string,
  address: string,
  roomName: string,
  seatName: string,
  createdAt: string,
  beginAt: string,
  seatPrice: number,
  ticketSatus: string
}