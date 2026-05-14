'use client'

import Sidebar from "./SideBar";
import ChatWindow from "./ChatWindow";
import { useState, useEffect } from "react";
import { getCustomerInfo } from "@/src/utils/localStorage.utils";
import { useRouter } from "next/navigation";
import { ContactGetResDTO } from "@/src/types/Message";
import { useChat } from "@/src/hooks/useChat";


export default function TelegramPage() {
  const userId = getCustomerInfo();
  const router = useRouter();
  const [selectedContact, setSelectedContact] = useState<ContactGetResDTO>();
  const connection = useChat();
  useEffect(() => {
    if(!userId){
        router.push("/login");
    }
  }, [userId]);
  return (
      <main className="h-screen w-full flex bg-[#17212b] text-white overflow-hidden font-sans">
        <Sidebar selectedContact={selectedContact} setSelectedContact={setSelectedContact} connection={connection}/>
        {
          selectedContact ?(
            <ChatWindow selectedContact={selectedContact} connection={connection}
            />
          ) : (
            <ChatWindow connection={connection}/>
          )
        }
      </main>
  );
}