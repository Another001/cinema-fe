'use client'

import { useEffect, useState } from "react";
import { MessageGetRes } from "@/src/types/Message";
import { useAuthContext } from "@/src/context/AuthContext";

export default function useChatWindow(conversationId: number | undefined, connection: signalR.HubConnection | null){
  const [messages, setMessages] = useState<MessageGetRes[]>([]);
  const customer = useAuthContext();
  useEffect(() => {
    setMessages([]);
    if (!conversationId || !connection || !customer.user) return;

    const handleReceiveMessage = (userName: string, senderId: number, message: string, msgId: number, msgCreatedAt: string) => {
      setMessages(pre => [...pre, { messageId: msgId, senderId, createdAt: msgCreatedAt, message, senderName: userName }]);
    };

    connection.on("ReceiveMessage", handleReceiveMessage);

    connection.invoke("JoinConversation", conversationId).catch(console.error);

    connection.on("DeletedActiveConversation", () => {
      console.log("Nhan tin hieu huy hoi thoai o support");
    })

    return () => {
      connection.off("ReceiveMessage", handleReceiveMessage);
      
      if (connection.state === "Connected") {
        connection.invoke("LeaveConversation", conversationId).catch(console.error);
      }
    };
  }, [conversationId, connection, customer.user]);
  const sendMessage = async (userId: number, message: string) => {
    if(!userId || !conversationId || !connection)
      return;
    console.log("gui tin nhan sau", userId, conversationId, message)
    await connection.invoke("SendMessage", userId, conversationId, message);
    console.log("Da gui tin nhan");
  }
  return {
    messages,
    sendMessage, 
  }
}