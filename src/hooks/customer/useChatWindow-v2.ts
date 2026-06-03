'use client'

import { useEffect, useState } from "react";
import { MessageGetRes } from "@/src/types/Message";
import { useAuthContext } from "@/src/context/AuthContext";

export default function useChatWindow(conversationId: number | undefined, connection: signalR.HubConnection | null, setIsSocket: any) {
  const [messages, setMessages] = useState<MessageGetRes[]>([]);
  const customer = useAuthContext();

  useEffect(() => {
    if (!conversationId || !connection || !customer.user) return;

    console.log("trang thai connection la ", connection.state, connection)

    let isMounted = true; // Dùng cờ này để tránh lỗi unmount component giữa chừng

    const handleReceiveMessage = (userName: string, senderId: number, message: string, msgId: number, msgCreatedAt: string) => {
      setMessages(pre => [...pre, { messageId: msgId, senderId, createdAt: msgCreatedAt, message, senderName: userName }]);
    };

    connection.on("ReceiveMessage", handleReceiveMessage);

    // Xử lý sự kiện huỷ hội thoại
    connection.on("DeletedActiveConversation", () => {
      console.log("Nhan tin hieu huy hoi thoai o usser");
      setIsSocket(false);
      // ĐÃ XOÁ: return () => {...} ở đây vì sai cú pháp của event callback
    });

    // Hàm an toàn để JoinConversation
    const tryJoinConversation = async () => {
      let attempts = 0;
      console.log("=== Bắt đầu đợi socket kết nối... Trạng thái hiện tại là:", connection.state);
      
      // Vòng lặp sẽ chạy liên tục nếu trạng thái CHƯA PHẢI là "Connected"
      while (connection.state !== "Connected" && attempts < 50 && isMounted) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Đợi 100ms mỗi lần
        attempts++;
      }

      if (isMounted && connection.state === "Connected") {
        console.log("=== Socket đã CONNECTED thành công! Tiến hành JoinConversation với id:", conversationId);
        connection.invoke("JoinConversation", conversationId).catch(console.error);
      } else {
        console.error(`=== THẤT BẠI: Sau 5 giây đợi, socket vẫn không sẵn sàng. Trạng thái cuối cùng: '${connection.state}'`);
      }
    };

    tryJoinConversation();

    // Hàm dọn dẹp CHUẨN của useEffect
    return () => {
      isMounted = false; // Dừng vòng lặp wait (nếu đang chạy)
      connection.off("ReceiveMessage", handleReceiveMessage);
      connection.off("DeletedActiveConversation");
      
      if (connection.state === "Connected") {
        connection.invoke("LeaveConversation", conversationId).catch(console.error);
      }
    };
  }, [conversationId, connection, customer.user]);

  const sendMessage = async (userId: number, message: string) => {
    if(!userId || !conversationId || !connection) return;
    
    console.log("gui tin nhan sau", userId, conversationId, message);
    
    // An toàn hơn: kiểm tra connected trước khi gửi
    if (connection.state === "Connected") {
      await connection.invoke("SendMessage", userId, conversationId, message);
      console.log("Da gui tin nhan");
    } else {
      console.warn("Không thể gửi, socket chưa sẵn sàng.");
    }
  }

  return {
    messages,
    sendMessage, 
  }
}