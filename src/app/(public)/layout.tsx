'use client'

import ChatSupport from "@/src/components/user/ChatSupport-v2";
import Header from "@/src/components/user/Header";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const{user, isLoading} = useAuthContext();
    const router = useRouter();
    useEffect(() => {
      if (!isLoading) {
        if(user?.role == "Support"){
          router.replace("/supporter");
        }
      }
    }, [user, isLoading, router]);
  return (
    <div className="relative">
      <Header />
      {children}
      <ChatSupport />
    </div>
  );
}