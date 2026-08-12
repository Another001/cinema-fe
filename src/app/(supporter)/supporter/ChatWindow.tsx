"use client"

import { Phone, Video, Search, MoreVertical, Smile, Paperclip, Send } from "lucide-react";
import MessageItem from "./MessageItems";
import { ContactGetResDTO } from "@/src/types/Message";
import { MessageGetRes } from "@/src/types/Message";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getCustomerInfo } from "@/src/utils/localStorage.utils";
import messageApi from "@/src/api/api-v2/message";
import useChatWindow from "@/src/hooks/supporter/useChatWindow-v2";

interface Props{
  selectedContact? : ContactGetResDTO,
  connection : signalR.HubConnection | null
}

export default function ChatWindow({selectedContact, connection} : Props) {
  const userId = getCustomerInfo();
  const [historyMessages, setHistoryMessages] = useState<MessageGetRes[]>([]);
  const {messages, sendMessage} = useChatWindow(selectedContact?.conversationId ?? 0, connection)
  const [input, setInput] = useState<string>("")
  const autoScroll = useRef<HTMLDivElement | null>(null);
  const handleSend = useCallback(async () => {
    if(!input || !userId)
      return;
    await sendMessage(Number(userId.id), input);
    setInput("")
  },[input])
  useEffect(() => {
    const getData = async () => {
      if(!selectedContact)
        return;
      const data = await messageApi.listMessageBySupport(selectedContact.conversationId);
      setHistoryMessages(data);
      const element = autoScroll.current;
      if(element){
        setTimeout(() => {
          element.scrollTop = element.scrollHeight;
        }, 100);
      }
    }
    getData();
  },[selectedContact])
  useEffect(() => {
    const element = autoScroll.current;
    if(element){
      if(element.scrollHeight - element.scrollTop - element.clientHeight < 300){
        setTimeout(() => {
          element.scrollTop = element.scrollHeight;
        }, 100);
      }
    }
  },[messages])
  const allMessage : MessageGetRes[] = useMemo(() => [...historyMessages, ...messages], [historyMessages, messages])
  if(!selectedContact)
    return (
      <section className="flex-1 flex flex-col chat-bg min-w-0"></section>
    )
  return (
    <section className="flex-1 flex flex-col chat-bg min-w-0">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-3 bg-[#17212b] border-b border-[#0f1620]">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-br from-pink-500 to-rose-600">
          {selectedContact?.nameContact.slice(0,1)}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold truncate">{selectedContact?.nameContact}</h2>
          {/*<div className="flex gap-2 items-end">
            <p className="text-sm text-white">Số điện thoại:</p>
            <p className="text-xs text-[#3390ec]">{selectedContact?.phoneContact}</p>
          </div>*/}
        </div>
        <div className="flex items-center gap-1">
          {[Phone, Video, Search, MoreVertical].map((Icon, i) => (
            <button key={i} className="p-2 hover:bg-[#242f3d] rounded-full text-gray-300">
              <Icon size={20} />
            </button>
          ))}
        </div>
      </header>

      {/* Messages List */}
      <div ref={autoScroll}
        className="flex-1 overflow-y-auto hide-scrollbar px-6 py-4 space-y-2 flex flex-col">
        {allMessage?.length > 0 && allMessage.map((items, index) => {
          // 1. Tìm tin nhắn liền trước nó (nếu index = 0 thì không có tin nhắn trước)
          const previousMessage = index > 0 ? allMessage[index - 1] : null;          
        //  const isDifferentSender = !previousMessage || previousMessage.senderId !== items.senderId;
          const shouldShowName = items.senderId !== previousMessage?.senderId ;
          const isOut = items.senderId === Number(userId.id);
          return (
            <div key={items.messageId || index} className={`flex w-full ${isOut ? 'justify-end' : 'justify-start'}`}>
              <div className="flex flex-col max-w-[75%]">
              {/**/shouldShowName && (
                <span className="text-xs text-blue-400 font-semibold mb-1 mx-2">
                  {items.senderName || "Người dùng"}
                </span>
              )/**/}
              <MessageItem type={items.senderId == Number(userId.id) ? "out" : "in"} text={items.message} time={items.createdAt as string}/>
              </div>
            </div>
          )
          })
        }
      </div>

      {/* Input Area */}
      <footer className="p-3 bg-[#17212b] border-t border-[#0f1620]">
        <div className="flex items-end gap-2 bg-[#242f3d] rounded-2xl px-3 py-2">
          <button className="p-2 hover:bg-[#2b3544] rounded-full text-gray-300">
            <Smile size={22} />
          </button>
          <textarea
            value={input}
            placeholder="Nhập tin nhắn..." 
            className="flex-1 bg-transparent resize-none focus:outline-none text-sm max-h-[100px] overflow-y-auto"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="p-2 hover:bg-[#2b3544] rounded-full text-gray-300">
            <Paperclip size={22} />
          </button>
          <button className="p-2 hover:bg-[#2b3544] rounded-full text-[#3390ec]"
            onClick={handleSend}
          >
            <Send size={22} />
          </button>
        </div>
      </footer>
    </section>
  );
}