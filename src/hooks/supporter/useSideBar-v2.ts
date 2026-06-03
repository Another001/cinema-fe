'use client'

import { useEffect, useState, useSyncExternalStore } from "react";
import { ContactGetResDTO } from "@/src/types/Message";

export default function useSideBar({connection, userId} : {connection: signalR.HubConnection | null, userId: any}){
  const [contactState, setContactState] = useState<ContactGetResDTO>();
  const [deletedWaiting, setDeletedWaiting] = useState<number>();
  const [addFromWaitingToActive, setAddFromWaitingToActive] = useState<number>();
  const [deletedActive, setDeletedActive] = useState<number>();
  useEffect(() => {
    if(!connection || !userId)
      return;
    const startChat = async () => {
      try{
        console.log("Vao sidebar thanh cong");
        connection.on("UpdateWaiting", (payload) => {
          console.log("nhan message sidebar", payload.senderName, payload.senderId, payload.conversationId, payload.message, payload.msgId, payload.senderPhone, payload.msgCreatedAt);
          setContactState({
            conversationId: payload.conversationId,
            nameContact: payload.senderName,
            previewMessage: {
              lastMessageId: payload.msgId,
              lastMessage : payload.message,
              senderId: payload.senderId,
              timeLastMessage: payload.msgCreatedAt,
              senderName: payload.senderName,
              isSeen: true
            },
          })
        })
        connection.on("UpdateActive", (payload) => {
          console.log("nhan message sidebar active", payload.senderName, payload.senderId, payload.conversationId, payload.message, payload.msgId, payload.senderPhone, payload.msgCreatedAt);
          setContactState({
            conversationId: payload.conversationId,
            nameContact: payload.senderName,
            previewMessage: {
              lastMessageId: payload.msgId,
              lastMessage : payload.message,
              senderId: payload.senderId,
              timeLastMessage: payload.msgCreatedAt,
              senderName: payload.senderName,
              isSeen: true
            },
          })
        })
        connection.on("DeletedActiveConversation", conversationId => {
          console.log("Nhan su kien danh dau da hoan thanh");
          setDeletedActive(conversationId);
        })
        connection.on("DeletedWaitingConversation", conversationId => {
          console.log("lang nghe su kien xoa khoi poooll", conversationId)
          setDeletedWaiting(conversationId);
        })
        connection.on("AddActiveConversation", conversationId => {
          console.log("lang nghe su kien them vao private", conversationId);
          setAddFromWaitingToActive(conversationId);
        })
        await connection.invoke("UserInit", userId);
      }
      catch{
        console.log("co loi");
      }
    }
     startChat();
    // 3. CLEANUP: Chạy khi User thoát khỏi phòng (Component unmount)
    return () => {
      console.log(`Đang rời sidebar`);
      
      // Tắt lắng nghe sự kiện để tránh trùng lặp tin nhắn khi vào lại
      connection.off("UpdateWaiting");
      // BẠN BỊ THIẾU DÒNG NÀY !!!
      connection.off("UpdateActive"); 
      connection.off("DeletedWaitingConversation");
      connection.off("AddActiveConversation");
    };
  },[connection, userId])
  const markAsReadForSideBar = async (userId: number, messageId: number, conversationId : number) => {
    if(!connection || !userId)
      return;
    await connection.invoke("MaskAsRead", userId, conversationId, messageId);
    console.log("da doc tin nhan nhe", messageId);
  }
  const moveConversationFromPool = async(conversationId : number, userId: number) => {
    if(!connection || !conversationId || !userId)
      return;
    console.log("goi su kien xoa khoi poool", userId, conversationId)
    await connection.invoke("MoveConversationFromPool", conversationId, userId)
  }
  const markConversationDone = async(conversationId : number, userId: number) => {
    if(!connection || !conversationId || !userId)
      return;
    console.log("goi su kien xoa khoi poool", userId, conversationId)
    await connection.invoke("MarkConversationDone", conversationId, userId)
  }
  return {
    contactState,
    markAsReadForSideBar,
    moveConversationFromPool,
    addFromWaitingToActive,
    deletedWaiting,
    deletedActive,
    markConversationDone
  }
}