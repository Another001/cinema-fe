'use client'

import NavBar from "../../../../components/admin/NavBar"

export default function Page() {
  return(
    <div className="relative z-10 flex-1 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-[linear-gradient(135deg,rgba(168,85,247,0.1),rgba(56,189,248,0.05))] border-1 border-[linear-gradient(135deg,rgba(168,85,247,0.1),rgba(56,189,248,0.05))] rounded-3xl 
            p-10 
            mb-8 
            backdrop-blur-md">
          <div className="font-playfair mb-2 text-[1.5rem] font-[800] text-white">
            Chào mừng trở lại, Admin!
          </div>
          <div className="text-[0.95rem] bg-[rgba(226, 232, 240, 0.6)] mb-6 text-white font-playfair">Quản lý rạp phim, vé và thống kê doanh thu của bạn tại đây.</div>
          <NavBar/>
        </div>
      </div>
    </div>
  )
}