import AdminHeader from "@/src/components/admin/AdminHeader";

export default function Page() {
  return(
    <div className="
    relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_25%,#0f172a_50%,#1a1a2e_75%,#0f172a_100%)]
    before:content-[''] 
    before:absolute 
    before:top-[-50%] 
    before:left-[-50%] 
    before:w-[200%] 
    before:h-[200%]
    before:bg-[radial-gradient(ellipse_at_30%_50%,rgba(168,85,247,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_70%_20%,rgba(56,189,248,0.06)_0%,transparent_40%)]
    before:animate-[drift_20s_ease-in-out_infinite]
    min-h-screen
    ">
      <AdminHeader />
    </div>
  )
}