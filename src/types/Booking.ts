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

export interface adminGetShowtime{
  customerId: number,
  customerName: string,
  customerPhone: string,
  isConfirm: boolean,
  createdAt: string,
  customerReservation: customerReservation[]
}

export interface customerReservation{
  seatId: number,
  seatName: string,
  seatType: string,
  price: number,
}