import { CUSTOMER_INFO } from "../config/constraints/localStorage.constraints";
import { CustomerFakeLoginRes } from "../types/Customer";

export const getCustomerInfo = () => {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(CUSTOMER_INFO);
  return data ? JSON.parse(data) : null;
};

export const setCustomerInfo = (customerInfo: CustomerFakeLoginRes) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(CUSTOMER_INFO, JSON.stringify(customerInfo));
};

export const deleteCustomerInfo = () => {
  if (typeof window === "undefined") return;

  localStorage.setItem(CUSTOMER_INFO, "");
};