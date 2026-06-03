import apiInstance from "../apiInstance";
import { ContactGetResDTO, MessageGetRes } from "../../types/Message";

const messageApi = {
  listMessageBySupport: (conversationId: number) : Promise<MessageGetRes[]> => {
    return apiInstance.get(`Message/ListMessageBySupport/${conversationId}`);
  },
  getMessage_v2: (userId: number) : Promise<MessageGetRes[]> => {
    return apiInstance.get(`Message/ListMessage-v2/${userId}`);
  },
  createConversation_v2: (userId: number) : Promise<number> => {
    return apiInstance.get(`Message/CreateConversation/${userId}`);
  },
  listConversation_v2: (userId: number, conversationState: string) : Promise<ContactGetResDTO[]> => {
    return apiInstance.get(`Message/ListContact-v2`, {params :{
      userId, conversationState
    }});
  },
  addSupportToConversation: (conversationId: number, userId: number) : Promise<any> => {
    return apiInstance.get(`Message/AddSupportToConversation`, {params:{
      conversationId,
      userId,
    }})
  },
  listConversation: (userId: number) : Promise<ContactGetResDTO[]> => {
    return apiInstance.get(`Message/ListContact/${userId}`);
  }
};

export default messageApi;