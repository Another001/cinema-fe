import apiInstance from "./apiInstance";
import { CustomerFakeLoginReq, CustomerFakeLoginRes } from "../types/Customer";
import { createReservationReqDto, createReservationResDto } from "../types/Booking";

const bookingApi = {
  fakeLogin: ({phone}: CustomerFakeLoginReq) :Promise<CustomerFakeLoginRes> => {
    return apiInstance.post('Customer/login', {phone})
  },
  createReservation: (dto : createReservationReqDto) : Promise<createReservationResDto> =>{
    return apiInstance.post('Booking/Reservation', dto);
  },
  confirmReservation: (showtimeId: number) => {
    console.log("Duong linkkkk", `Booking/Confirm/${showtimeId}`)
    return apiInstance.get(`Booking/Confirm/${showtimeId}`);
  }
};

export default bookingApi;