import apiInstance from "./apiInstance";
import { CustomerFakeLoginReq, CustomerFakeLoginRes } from "../types/Customer";
import { adminGetShowtime, createReservationReqDto, createReservationResDto } from "../types/Booking";

const bookingApi = {
  fakeLogin: ({phone}: CustomerFakeLoginReq) :Promise<CustomerFakeLoginRes> => {
    return apiInstance.post('Customer/login', {phone})
  },
  createReservation: (dto : createReservationReqDto) : Promise<createReservationResDto> =>{
    return apiInstance.post('Booking/Reservation', dto);
  },
  confirmReservation: (reservationId : number) => {
    return apiInstance.get(`Booking/Confirm/${reservationId}`);
  },
  adminGetShowtime: (showtimeId: number): Promise<adminGetShowtime[]> => {
    return apiInstance.get(`Booking/ShowtimeDetail/Admin/${showtimeId}`);
  }
};

export default bookingApi;