'use client'

import { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAuthContext } from '../context/AuthContext';

export const useChat = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const userId = useAuthContext();
  useEffect(() => {
    if (!userId || connectionRef.current) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5102/chatHub")
      .withAutomaticReconnect()
      .build();
    connectionRef.current = newConnection;

    newConnection.start()
      .then(() => {
        setConnection(newConnection);
      })
      .catch(err => console.error("SignalR Connection Error: ", err));
    console.log("socket thanh cong");

    return () => {
      if (
          newConnection.state === signalR.HubConnectionState.Connected
      ) {
          newConnection.stop();
      }
    };
  }, [userId]);

  return connection;
};