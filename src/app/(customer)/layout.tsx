import Header from "@/src/components/user/Header";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {user, isLoading} = useAuthContext();
  const router = useRouter();
  if(!isLoading){
    if(user.role == "Support")
      router.replace("/supporter");
  }
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}