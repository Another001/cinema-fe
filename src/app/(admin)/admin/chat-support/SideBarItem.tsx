import { ContactGetResDTO } from "@/src/types/Message";
import { changeToHourMinute } from "@/src/utils/datetime";
import { Check } from "lucide-react";

interface Props {
  chat : ContactGetResDTO, isSeen: boolean, contactList: ContactGetResDTO[], setSelectedContact: any
}

export default function SideBarItem({chat, isSeen, contactList, setSelectedContact }: Props){
  return(
    <button 
      className={`w-full flex items-center gap-3 px-3 py-2.5 transition hover:bg-[#202b36] `}
      onClick={ () => {
        const contact = contactList?.find(x => x.conversationId == chat.conversationId);
        console.log("contact la ", contact)
        if(contact){
          setSelectedContact(contact)
        }
      }}
    >
      <div className="relative flex-shrink-0">
        <div className={`w-[52px] h-[52px] rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center font-semibold text-lg`}>
          {chat.nameContact.slice(0,1)}
        </div>
        {/*chat.online && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#17212b] rounded-full"></span>
        )*/}
      </div>
      
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold truncate">{chat.nameContact}</h3>
          <span className={`text-xs 'text-gray-400'}`}>{changeToHourMinute(chat.previewMessage?.timeLastMessage) ?? " "}</span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          {/*Select nho them vao*/}
          <p className={`text-sm truncate flex items-center gap-1 text-gray-400`}>
            {true && <Check size={14} className="text-sky-400" />}
            {chat.previewMessage?.lastMessage ?? ""}
          </p>
          {!isSeen && (
            <span className="min-w-[10px] h-3 px-1.5 bg-[#66CCFF] text-[5px] font-bold rounded-full flex items-center justify-center">
            </span>
          )}
        </div>
      </div>
    </button>
  )
}