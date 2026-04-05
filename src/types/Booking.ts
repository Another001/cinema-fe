export interface createReservationReqDto{
  showtimeId: number,
  customerId: number,
  seats: {
    seatId: number
  }[]
}

export interface createReservationResDto{
  id : number,
  showtimeId: number,
}