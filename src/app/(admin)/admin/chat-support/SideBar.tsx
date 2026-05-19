'use client'

import { ContactGetResDTO, PreviewMessageResDTO } from "@/src/types/Message";
import { Menu, Search, Pencil, Check, AArrowDown } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { changeToHourMinute } from "@/src/utils/datetime";
import { getCustomerInfo } from "@/src/utils/localStorage.utils";
import messageApi from "@/src/api/message";
import useSideBar from "@/src/hooks/admin/useSideBar";
import findContact from "@/src/utils/filterContact";
import SideBarItem from "./SideBarItem";

export default function Sidebar({selectedContact, setSelectedContact, connection}: {selectedContact? : ContactGetResDTO, setSelectedContact: any, connection: signalR.HubConnection | null}) {
  const [contactList, setContactList] = useState<ContactGetResDTO[]>([]);
  const {contactState} = useSideBar(connection);
  const [findBar, setFindBar] = useState<string>("");
  const filterContact = useMemo(() => findContact(findBar, contactList), [findBar])
  const user = getCustomerInfo();
  useEffect(() => {
    if(!contactState)
      return;
    const updateContact : ContactGetResDTO = {
      conversationId : contactState.conversationId,
      nameContact : selectedContact?.conversationId == contactState.conversationId ? selectedContact.nameContact : contactState.nameContact,
      phoneContact: selectedContact?.phoneContact,
      previewMessage : {
        lastMessage: contactState.previewMessage.lastMessage,
        lastMessageId: contactState.previewMessage.lastMessageId,
        senderName : contactState.previewMessage.senderName,
        senderId: contactState.previewMessage.senderId,
        timeLastMessage: contactState.previewMessage.timeLastMessage,
        isSeen : contactState.conversationId == selectedContact?.conversationId
      }
    }
    const newContactList: ContactGetResDTO[] = contactList.map(x => {
      if(x.conversationId != contactState.conversationId)
        return x; 
      return updateContact;
    });
    console.log("newcontatcList la ", newContactList)
    const newContactList2 : ContactGetResDTO[] = newContactList.filter((item) => item.conversationId != contactState.conversationId)
    const newContact : ContactGetResDTO | undefined = newContactList.find(x => x.conversationId == contactState.conversationId);
    console.log("new contatc list 2 laf", newContact)
    if(!newContact){
      setContactList([updateContact, ...newContactList2])
      return;
    }

    setContactList([newContact, ...newContactList2]);
  },[contactState])
  useEffect(() => {
    const getData = async () => {
      if(!user)
        return;
      try{
        const data = await messageApi.listConversation(Number(user.id));
        setContactList(data);
        console.log("tai contact thanh cong", data);
      }
      catch{
        console.log("co loi khi list contact");
      }
    }
    getData();
  },[]);
  const clickContact = (conversationId : number) => {
    const contact = contactList?.find(x => x.conversationId == conversationId);
    console.log("contact list la ", contactList)
    console.log("contact la ", contact)
    if(contact){
      setSelectedContact(contact);
      const newContactList : ContactGetResDTO[] = contactList.map((item) => {
        if(item.conversationId != contact.conversationId){
          return item;
        }
        const nowContact : ContactGetResDTO = {
          conversationId : item.conversationId,
          nameContact: item.nameContact,
          phoneContact: item.phoneContact,
          previewMessage: {
            lastMessageId: item.previewMessage.lastMessageId,
            lastMessage: item.previewMessage.lastMessage,
            senderName: item.previewMessage.senderName,
            senderId: item.previewMessage.senderId,
            timeLastMessage: item.previewMessage.timeLastMessage,
            isSeen: true
          }
        }
        return nowContact;
      })
      setContactList(newContactList)

    }
  }
  return (
    <aside className="w-[360px] flex-shrink-0 bg-[#17212b] border-r border-[#0f1620] flex flex-col relative">
      <header className="flex items-center gap-3 p-3 border-b border-[#0f1620]">
        <button className="p-2 hover:bg-[#242f3d] rounded-full transition text-gray-300">
          <Menu size={20} />
        </button>
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value = {findBar}
            onChange={(e) => setFindBar(e.target.value)}
            placeholder="Tìm kiếm" 
            className="w-full bg-[#242f3d] rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3390ec] placeholder-gray-400"
          />
        </div>
      </header>          
          {findBar.length > 0 ? (
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {
                filterContact && 
                  filterContact.map((chat, index) => {
                    return <SideBarItem key = {index} chat = {chat} setSelectedContact={setSelectedContact} contactList={contactList} isSeen = {true} setFindBar = {setFindBar}/>
                  })
              }
            </div>
            ) : (
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {contactList?.map((chat) => {
                  return(
                    <button 
                    key={chat.conversationId}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 transition hover:bg-[#202b36] ${selectedContact?.conversationId == chat.conversationId ?  "bg-[#2b5278]" : ""}`}
                    onClick={() => clickContact(chat.conversationId)}
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
                        <div className={`text-sm truncate flex items-center gap-1 text-gray-400`}>
                          <p>{chat.previewMessage.senderId == 44 ? "Bạn" : chat.previewMessage.senderName}: </p>
                          {chat.previewMessage?.lastMessage && (
                            chat.previewMessage.lastMessage.length > 10 
                              ? `${chat.previewMessage.lastMessage.slice(0, 10)}...` 
                              : chat.previewMessage.lastMessage
                          )}
                        </div>
                        {(!chat.previewMessage?.isSeen && chat.previewMessage.senderId != Number(user.id)) && (
                          <span className="min-w-[10px] h-3 px-1.5 bg-[#66CCFF] text-[5px] font-bold rounded-full flex items-center justify-center">
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                  )
                })}
              </div>
            )}
      
      <button className="absolute bottom-6 right-6 w-14 h-14 bg-[#3390ec] hover:bg-[#2b7bc9] rounded-full shadow-lg flex items-center justify-center transition">
        <Pencil size={24} />
      </button>
    </aside>
  );
}