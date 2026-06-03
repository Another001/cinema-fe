'use client'

import { Home, Ticket, Film, Warehouse, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function NavBar(){
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
      <Link href="/admin/cinema" className="relative flex items-center px-[1.25rem] py-[0.5rem] rounded-xl border gap-3 text-white text-[0.9rem] font-[600] hover:text-yellow-500">
        <Warehouse className="w-7 h-7" />
        Quản lí rạp 
      </Link>
      <Link href="/supporter" className="relative flex items-center px-[1.25rem] py-[0.5rem] rounded-xl border gap-3 text-white text-[0.9rem] font-[600] hover:text-yellow-500">
        <MessageCircle className="w-7 h-7" />
        Chăm sóc khách hàng 
      </Link>
    </div>
  ) 
}