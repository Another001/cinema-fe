import apiInstance from "./apiInstance";
import { CustomerFakeLoginReq, CustomerFakeLoginRes, TicketGetRes } from "../types/Customer";

const customerApi = {
  fakeLogin: ({phone, password}: CustomerFakeLoginReq) :Promise<CustomerFakeLoginRes> => {
    return apiInstance.post('Customer/login', {phone, password})
  },
  myTicket: (customerId : number) : Promise<TicketGetRes[]> => {
    return apiInstance.get(`Customer/UserTickets/${customerId}`)
  }
};

export default customerApi;