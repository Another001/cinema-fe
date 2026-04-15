import { Clapperboard, Settings, LogOut } from "lucide-react";
import Link from "next/link";


export default function AdminHeader(){
  return(
    <div className="border-b-2 border-[rgba(148,163,184,0.1)] bg-[rgba(15,23,42,0.5)] relative z-20 p-4">
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <Link className="flex items-center gap-4" href="/admin/dashboard">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Clapperboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-[1.25rem] font-black tracking-wider bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-serif">
              STARLIGHT CINEMA
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-tight">Quản Lý Hệ Thống</div>
          </div>
        </Link>
        <div className="flex items-center gap-5">
          <div className="w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-slate-600 flex items-center justify-center transition">
            <Settings className="w-5 h-5 text-white"></Settings>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-white hover:text-red-400"></LogOut>
          </div>
        </div>
      </div>
    </div>
  )
}