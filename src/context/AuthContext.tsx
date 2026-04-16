'use client'

import { useContext, useState, createContext, ReactNode, useEffect } from "react"
import { setCustomerInfo, deleteCustomerInfo, getCustomerInfo } from "../utils/localStorage.utils";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: any
  setUser: React.Dispatch<React.SetStateAction<any>>
  loginSuccess : any
  logoutSuccess : any
  isLoading: boolean,
  setIsLoading: any
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children} : {children :ReactNode}) => {
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(true); // Mặc định là đang load
  useEffect(() => {
    const savedUser = getCustomerInfo();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false); // Đã kiểm tra xong (dù có user hay không)
  }, []);
  const router = useRouter();
  const loginSuccess = (user : any) => {
    setCustomerInfo(user);
    setUser(user);
  }
  const logoutSuccess = () => {
    deleteCustomerInfo();
    setUser(null);
    router.push('/login')
  }
  return (
    <AuthContext.Provider value={{user, setUser, loginSuccess, logoutSuccess, isLoading, setIsLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("Must be used inside AuthProvider")
  }

  return context
}