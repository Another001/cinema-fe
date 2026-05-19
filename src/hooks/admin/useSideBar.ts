'use client'

import { useEffect, useState, useSyncExternalStore } from "react";
import { ContactGetResDTO } from "@/src/types/Message";

export default function useSideBar(connection: signalR.HubConnection | null){
  const [contactState, setContactState] = useState<ContactGetResDTO>();
  useEffect(() => {
    if(!connection)
      return;
    const startChat = async () => {
      try{
        console.log("Vao sidebar thanh cong");
        connection.on("UpdateChatList", (senderName, senderId, conversationId, message, msgId, senderPhone, msgCreatedAt) => {
          console.log("nhan message sidebar", senderName, senderId, conversationId, message, msgId, senderPhone, msgCreatedAt);
          setContactState({
            conversationId: conversationId,
            nameContact: senderName,
            previewMessage: {
              lastMessageId: msgId,
              lastMessage : message,
              senderId,
              timeLastMessage: msgCreatedAt,
              senderName: senderName,
              isSeen: true
            },
          })
        })
        await connection.invoke("UserInit", 44);
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
      connection.off("UpdateChatList");
    };
  },[connection])
  const markAsReadForSideBar = async (userId: number, messageId: number, conversationId : number) => {
    if(!connection || !userId)
      return;
    await connection.invoke("MaskAsRead", userId, conversationId, messageId);
    console.log("da doc tin nhan nhe", messageId);
  }
  return {
    contactState,
    markAsReadForSideBar
  }
}