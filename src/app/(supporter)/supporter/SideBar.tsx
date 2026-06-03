'use client'

import { ContactGetResDTO } from "@/src/types/Message";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import messageApi from "@/src/api/api-v2/message";
import useSideBar from "@/src/hooks/supporter/useSideBar-v2";
import SideBarItem from "./SideBarItems"
import { useAuthContext } from "@/src/context/AuthContext";
import Accordion from "@/src/components/Accordion";

export default function Sidebar({selectedContact, setSelectedContact, connection}: {selectedContact? : ContactGetResDTO, setSelectedContact: any, connection: signalR.HubConnection | null}) {
  const [waitContactList, setWaitContactList] = useState<ContactGetResDTO[]>([]);
  const [activeContactList, setActiveContactList] = useState<ContactGetResDTO[]>([])
  const customer = useAuthContext();
  const {contactState, moveConversationFromPool, deletedWaiting, addFromWaitingToActive, deletedActive, markConversationDone} = useSideBar({connection, userId: customer?.user?.id});
  const clickWaitingSideBar = async (chat? : ContactGetResDTO) => {
    if(!customer.user || !chat){
      setSelectedContact();
      return;
    }  
    try{
      await messageApi.addSupportToConversation(chat.conversationId, customer.user.id);
      setSelectedContact(chat);
      await moveConversationFromPool(chat.conversationId, customer.user.id)
    }
    catch{
    }
  }

  const clickActiveSideBar = (chat? : ContactGetResDTO) => {
    if(!chat){
      setSelectedContact();
      return;
    }    
    setSelectedContact(chat);
  }
  useEffect(() => {
    const getData = async() => {
      if(!customer.user)
        return;
      console.log(" cusotomer la ", customer);
      const data = await messageApi.listConversation_v2(customer?.user?.id ?? 0, "waiting");
      setWaitContactList(data);
      console.log("wait contatc list la ", data);
      const data2 = await messageApi.listConversation_v2(customer?.user?.id ?? 0, "active");
      setActiveContactList(data2);
      console.log("active contatc lis al ", data2);
    }
    getData();
  },[customer])
  useEffect(() => {
    if(!deletedActive)
      return;
    const newActiveContact : ContactGetResDTO[] = activeContactList.filter(x => x.conversationId != deletedActive);
    setActiveContactList(newActiveContact);
  },[deletedActive])
  useEffect(() => {
    if(!contactState)
      return;
    console.log("contact state lang nghe duoc la", contactState)
    const updateActiveContact : ContactGetResDTO | undefined = activeContactList.find(x => x.conversationId == contactState.conversationId);
    if(updateActiveContact){
      console.log("co upadte active contatc ne")
      const newActiveContact : ContactGetResDTO[] = activeContactList.filter(x => x.conversationId != contactState.conversationId);
      console.log("upateactive contatc la ", updateActiveContact, newActiveContact)
      const ableContactState : ContactGetResDTO = {
        conversationId : updateActiveContact.conversationId,
        nameContact : updateActiveContact.nameContact,
        previewMessage : contactState.previewMessage 
      }
      setActiveContactList([ableContactState, ...newActiveContact])
      return;
    }
    const updateContact : ContactGetResDTO | undefined = waitContactList.find(x => x.conversationId == contactState?.conversationId);
    if(!updateContact){
      setWaitContactList([contactState, ...waitContactList]);
      return;
    }
    const ableContactState : ContactGetResDTO = {
      conversationId : updateContact.conversationId,
      nameContact : updateContact.nameContact,
      previewMessage : contactState.previewMessage 
    }
    const newContactList : ContactGetResDTO[] = waitContactList.filter(x => x.conversationId != contactState.conversationId);
    setWaitContactList([ableContactState, ...newContactList])
  },[contactState])
  useEffect(() => {
    if(!deletedWaiting)
      return;
    const contacts : ContactGetResDTO[] = waitContactList.filter(x => x.conversationId != deletedWaiting)
    setWaitContactList(contacts);
  }, [deletedWaiting])
  useEffect(() => {
    if(!addFromWaitingToActive)
      return;
    const contact : ContactGetResDTO | undefined = waitContactList.find(x => x.conversationId == deletedWaiting);
    if(contact){
      setActiveContactList([contact, ... activeContactList]);
    }
  },[addFromWaitingToActive])
  
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
            placeholder="Tìm kiếm" 
            className="w-full bg-[#242f3d] rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3390ec] placeholder-gray-400"
          />
        </div>
      </header>
      <Accordion title="Đang hỗ trợ">
        {activeContactList?.map((chat) => {
          return(
            <SideBarItem key = {chat.conversationId} chat = {chat} isSeen = {true} clickFunction={clickActiveSideBar} selectedContact={selectedContact} isActive={true}
              clickMarkAsDone={markConversationDone}
            />
          )
        })}
      </Accordion>
      <Accordion title="Cần hỗ trợ">
        {waitContactList?.map((chat) => {
          return(
            <SideBarItem key = {chat.conversationId} chat = {chat} isSeen = {true} clickFunction={clickWaitingSideBar} selectedContact={selectedContact} isActive={false}/>
          )
        })}
      </Accordion>
    </aside>
  );
}