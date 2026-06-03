'use client'

import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAuthContext } from '../context/AuthContext';

export const useChat = (isSocket: boolean) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const userId = useAuthContext();

  useEffect(() => {
    // Nếu không có user hoặc không kích hoạt socket, reset state về null và thoát
    if (!userId || !isSocket) {
      setConnection(null);
      return;
    }

    let isTokenActive = true; // Cờ bảo vệ chống trùng lặp kết nối (React Strict Mode)
    console.log("=== [useChat] Đang khởi tạo kết nối SignalR mới ===");

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5102/chatHub-v2")
      .withAutomaticReconnect()
      .build();

    newConnection.start()
      .then(() => {
        if (isTokenActive) {
          console.log("=== [useChat] Kết nối thành công! Set trạng thái Connected ===");
          setConnection(newConnection);
        } else {
          // Nếu component đã unmount/tắt socket trước khi start xong, đóng luôn cho an toàn
          newConnection.stop();
        }
      })
      .catch(err => {
        console.error("SignalR Connection Error: ", err);
        setConnection(null);
      });

    // Hàm dọn dẹp khi isSocket chuyển sang false hoặc component unmount
    return () => {
      console.log("=== [useChat] Đang dọn dẹp và ngắt kết nối socket cũ ===");
      isTokenActive = false;
      
      if (newConnection.state !== signalR.HubConnectionState.Disconnected) {
        newConnection.stop();
      }
      setConnection(null); // Xóa sạch connection cũ khỏi State
    };
  }, [userId, isSocket]);

  return connection;
};