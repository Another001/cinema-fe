'use client'

import { useEffect, useState, useSyncExternalStore } from "react";
import { ContactGetResDTO, MessageGetRes } from "@/src/types/Message";
import { UserRoundIcon } from "lucide-react";

export default function useSideBar(connection: signalR.HubConnection | null){
  const [contactState, setContactState] = useState<ContactGetResDTO>();
  useEffect(() => {
    if(!connection)
      return;
    const startChat = async () => {
      try{
        console.log("Vao sidebar thanh cong");
        connection.on("UpdateChatList", (senderId, conversationId, message, msgId, msgCreatedAt) => {
          console.log("nhan message sidebar");
          setContactState({
            conversationId: conversationId,
            nameContact: " ",
            previewMessage: {
              lastMessageId: msgId,
              lastMessage : message,
              senderId,
              timeLastMessage: msgCreatedAt,
              senderName: " ",
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
  return {
    contactState,
  }
}