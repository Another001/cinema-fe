import ChatSupport from "@/src/components/user/ChatSupport";
import Header from "@/src/components/user/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Header />
      {children}
      <ChatSupport />
    </div>
  );
}