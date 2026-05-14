"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import useChatWindow from '@/src/hooks/customer/useChatWindow';
import { getCustomerInfo } from '@/src/utils/localStorage.utils';
import { MessageGetRes } from '@/src/types/Message';
import messageApi from '@/src/api/message';
import { useChat } from '@/src/hooks/useChat';

export default function ChatSupport() {
  const customer = getCustomerInfo();
  const connection = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [historyMessages, setHistoryMessage] = useState<MessageGetRes[]>([]);
  const [conversationId, setConversationId] = useState<number>();
  const {messages, sendMessage} = useChatWindow(conversationId ?? 0, connection);
  const [input, setInput] = useState<string>();
  const autoScroll = useRef<HTMLDivElement | null>(null);
  const handleSend = async () => {
    if(!input || !customer)
      return;
    try{
      await sendMessage(customer.id, input);
      console.log("gui message thanh cong")
    }
    catch{
      console.log("loi khi gui tin nhan")
    }
    finally{
      setInput("");
    }
  }

  useEffect(() => {
    const getData = async () => {
      const getConversationId = await messageApi.getConversation(customer.id);
      setConversationId(getConversationId)
      const data = await messageApi.getMessage(getConversationId);
      setHistoryMessage(data);
      const element = autoScroll.current;
      if(element){
        setTimeout(() => {
          element.scrollTop = element.scrollHeight;
        }, 100);
      }
    }
    getData();
  },[]);

  useEffect(() => {
    const element = autoScroll.current;
    if(element){
      setTimeout(() => {
        element.scrollTop = element.scrollHeight;
      }, 0);
    } 
  },[isOpen])

  useEffect(() => {
    const element = autoScroll.current;
    if(element){
      if(element.scrollHeight - element.scrollTop - element.clientHeight < 300){
        setTimeout(() => {
          element.scrollTop = element.scrollHeight;
        }, 100);
      }
    }
  }, [messages])

  const allMessages = useMemo(() => {
    return [...historyMessages, ...messages];
  },[historyMessages, messages])
  console.log("all message laf", allMessages)
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Hộp thoại Chat */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header của Chat */}
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
            <h3 className="font-semibold">Hỗ trợ trực tuyến</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 rounded-full p-1">
              <X size={20} />
            </button>
          </div>

          {/* Vùng chứa tin nhắn (Container) */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4"
              ref = {autoScroll}
            >
              {/* Nếu không có tin nhắn */}
              {allMessages.length < 1 && (
                <div className="bg-white p-3 rounded-lg shadow-sm mb-2 self-start border border-gray-100 text-sm text-gray-600">
                  Chào bạn! Starlight Cinema có thể giúp gì cho bạn?
                </div>
              )}

              {/* Danh sách tin nhắn */}
              {allMessages.map((items, index) => {
                const isMine = items.senderId == customer.id;

                return (
                  <div
                    key={index}
                    className={`flex mb-2 ${
                      isMine ? "justify-end pl-10" : "justify-start pr-10"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[75%]
                        p-3
                        rounded-2xl
                        text-sm
                        shadow-sm
                        break-words
                        ${
                          isMine
                            ? "bg-[#2b5278] text-white rounded-br-md"
                            : "bg-white text-black rounded-bl-md"
                        }
                      `}
                    >
                      {items.message}
                    </div>
                  </div>
                );
              })}
            </div>
          
          {/* Ô nhập liệu */}
          <div className="p-3 border-t flex gap-2">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Nhập tin nhắn..." 
              className="flex-1 text-sm border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
              onClick={handleSend}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Nút bấm để mở Chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}