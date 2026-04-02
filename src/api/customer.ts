import apiInstance from "./apiInstance";
import { CustomerFakeLoginReq, CustomerFakeLoginRes } from "../types/Customer";

const customerApi = {
  fakeLogin: ({phone}: CustomerFakeLoginReq) :Promise<CustomerFakeLoginRes> => {
    return apiInstance.post('Customer/login', {phone})
  }
};

export default customerApi;