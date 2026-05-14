'use client'

import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { getCustomerInfo } from '../utils/localStorage.utils';

export const useChat = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    const userId = getCustomerInfo()
    if (!userId) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5102/chatHub")
      .withAutomaticReconnect()
      .build();

    newConnection.start()
      .then(() => {
        setConnection(newConnection);
      })
      .catch(err => console.error("SignalR Connection Error: ", err));
    console.log("socket thanh cong");

    return () => {
      if (newConnection) newConnection.stop();
    };
  }, []);

  return connection;
};