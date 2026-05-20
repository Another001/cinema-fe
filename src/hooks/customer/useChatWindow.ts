'use client'

import { useEffect, useState } from "react";
import { MessageGetRes } from "@/src/types/Message";
import { useAuthContext } from "@/src/context/AuthContext";

export default function useChatWindow(conversationId: number | undefined, connection: signalR.HubConnection | null){
  const [messages, setMessages] = useState<MessageGetRes[]>([]);
  const customer = useAuthContext();
  useEffect(() => {
    setMessages([])
    if(!conversationId || !connection)
      return;
    const startChat = async () => {
      try{
        console.log("Vao phong thanh cong");
        connection.on("ReceiveMessage", (senderId, message, msgId, msgCreatedAt) => {
          console.log("nhan message");
          setMessages(pre => [...pre, {
            messageId : msgId,
            senderId,
            createdAt: msgCreatedAt,
            message
          }])
        })
        await connection.invoke("JoinConversation", conversationId);
      }
      catch{
        console.log("co loi");
      }
    }
     startChat();
    // 3. CLEANUP: Chạy khi User thoát khỏi phòng (Component unmount)
    return () => {
      console.log(`Đang rời phòng: ${conversationId}`);
      
      // Tắt lắng nghe sự kiện để tránh trùng lặp tin nhắn khi vào lại
      connection.off("ReceiveMessage");

      // Thông báo cho Server biết User đã rời phòng (để ngừng gửi stream vào group này)
      if (connection.state === "Connected") {
        connection.invoke("LeaveConversation", conversationId)
          .catch(err => console.error("Lỗi khi rời phòng:", err));
      }
    };
  },[conversationId, connection, customer])
  useEffect(() => {
    if(messages.length < 1 || !customer.user)
      return
    markAsRead(customer.user.id, messages[0].messageId);
  },[messages])
  const sendMessage = async (userId: number, message: string) => {
    if(!userId || !conversationId || !connection)
      return;
    console.log("gui tin nhan sau", userId, conversationId, message)
    await connection.invoke("SendMessage", userId, conversationId, message);
    console.log("Da gui tin nhan");
  }
  const markAsRead = async (userId: number, messageId: number) => {
    if(!connection || !userId)
      return;
    await connection.invoke("MaskAsRead", userId,conversationId, messageId);
    console.log("da doc tin nhan nhe", messageId);
  }
  return {
    messages,
    sendMessage,
    markAsRead
  }
}