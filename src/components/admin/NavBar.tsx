'use client'

import { Home, Ticket, Film,  } from "lucide-react"
import Link from "next/link"

interface Props{
  tab : "Dashboard" | "Showtime" | "Movie",
  setTab : any
};

export default function NavBar({tab, setTab} : Props ){
  
  return(
    <div className="flex gap-4">
      <div className="relative flex items-center px-[1.25rem] py-[0.5rem] rounded-xl border gap-3 text-white">
        <Home className="w-7 h-7 text-white"></Home>
        <div className="text-white text-[0.9rem] font-[600]">Dashboard</div> 
      </div>
      <div className="relative flex items-center px-[1.25rem] py-[0.5rem] rounded-xl border gap-3 text-white text-[0.9rem] font-[600]">
        <Ticket className="w-7 h-7 text-white" />
        Quản lý vé
      </div>
      <Link href="/admin/showtime" className="relative flex items-center px-[1.25rem] py-[0.5rem] rounded-xl border gap-3 text-white text-[0.9rem] font-[600]">
        <Film className="w-7 h-7 text-white" />
          Lịch chiếu 
      </Link>
    </div>
  )
}