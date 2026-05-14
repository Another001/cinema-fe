import apiInstance from "./apiInstance";
import { ContactGetResDTO, MessageGetRes } from "../types/Message";

const messageApi = {
  getMessage: (conversationId: number) : Promise<MessageGetRes[]> => {
    return apiInstance.get(`Message/ChatList/${conversationId}`);
  },
  getConversation: (userId: number) : Promise<number> => {
    return apiInstance.get(`Message/GetConverSation/${userId}`);
  },
  listConversation: (userId: number) : Promise<ContactGetResDTO[]> => {
    return apiInstance.get(`Message/ListContact/${userId}`);
  }
};

export default messageApi;