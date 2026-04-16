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
      <Link href="/" className="relative flex items-center px-[1.25rem] py-[0.5rem] rounded-xl border gap-3 text-white hover:text-yellow-500">
        <Home className="w-7 h-7"></Home>
        <div className="text-[0.9rem] font-[600]">Về trang khách</div> 
      </Link>
      <Link href="/admin/create-movie" className="relative flex items-center px-[1.25rem] py-[0.5rem] rounded-xl border gap-3 text-white text-[0.9rem] font-[600] hover:text-yellow-500">
        <Ticket className="w-7 h-7" />
        Tạo phim mới
      </Link>
      <Link href="/admin/showtime" className="relative flex items-center px-[1.25rem] py-[0.5rem] rounded-xl border gap-3 text-white text-[0.9rem] font-[600] hover:text-yellow-500">
        <Film className="w-7 h-7" />
        Lịch chiếu 
      </Link>
    </div>
  )
}