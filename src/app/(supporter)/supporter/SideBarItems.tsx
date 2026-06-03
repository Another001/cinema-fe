'use client'

import { useAuthContext } from "@/src/context/AuthContext";
import { ContactGetResDTO } from "@/src/types/Message";
import { changeToHourMinute } from "@/src/utils/datetime";
import {CheckCheck } from "lucide-react";

interface Props {
  chat : ContactGetResDTO, isSeen: boolean, clickFunction : (chat? : ContactGetResDTO) => void, selectedContact?: ContactGetResDTO, isActive : boolean, clickMarkAsDone?: any
}

export default function SideBarItem({chat, isSeen, clickFunction, selectedContact, isActive, clickMarkAsDone}: Props){
  const customer = useAuthContext();
  return(
    <button 
      className={`w-full flex items-center gap-3 px-3 py-2.5 transition hover:bg-[#202b36] ${selectedContact?.conversationId == chat.conversationId && "bg-blue-400 rounded-xl"}`}
      onClick={() => clickFunction(chat)}
    >
      <div className="relative flex-shrink-0">
        <div className={`w-[52px] h-[52px] rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center font-semibold text-lg`}>
          {chat.nameContact.slice(0,1)}
        </div>
      </div>
      
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold truncate">{chat.nameContact}</h3>
          <span className={`text-xs 'text-gray-400'}`}>{changeToHourMinute(chat.previewMessage?.timeLastMessage) ?? " "}</span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          {/*Select nho them vao*/}
          <div className={`text-sm truncate flex items-center gap-1 text-white`}>
            <p>{chat.previewMessage?.senderId == 44 ? "Bạn" : chat.previewMessage?.senderName}: </p>
            <p>{chat.previewMessage?.lastMessage && (
              chat.previewMessage.lastMessage.length > 10 
                ? `${chat.previewMessage.lastMessage.slice(0, 10)}...` 
                : chat.previewMessage.lastMessage
            )}</p>
          </div>
          {isActive && (
            <div className="text-green-300" title="Đánh dấu đã hỗ trợ xong"
              onClick={async (e) => {
                e.stopPropagation();
                await clickMarkAsDone(chat.conversationId, customer.user.id)
                clickFunction(undefined);
              }}
            >
              <CheckCheck size={27}/>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}