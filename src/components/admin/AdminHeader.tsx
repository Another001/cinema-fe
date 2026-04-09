import { Clapperboard, LogOut } from "lucide-react";


export default function AdminHeader(){
  return(
    <div className="border-b-1 border-[rgba(148,163,184,0.1)] bg-[rgba(15,23,42,0.5)] relative z-20 p-4">
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Clapperboard className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg text-white font-bold tracking-wider font-playfair">STARLIGHT CINEMA</div>
        </div>
      </div>
    </div>
  )
}