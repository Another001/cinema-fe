'use client'

import { EmptyState } from "./EmptyState";
import { TicketCard } from "./TicketCard";
import { getCustomerInfo } from "@/src/utils/localStorage.utils";
import { useEffect, useState } from "react";
import customerApi from "@/src/api/customer";
import { TicketGetRes } from "@/src/types/Customer";

export default function HistoryPage() {
  const [tickets, setTickets] = useState<TicketGetRes[]>([]);
  const [customer, setCustomer] = useState<any>(null);
  useEffect(() => {
    const getData = async () => {
      const user = await getCustomerInfo();
      if (!user?.id) return;
      setCustomer(user);
      console.log('user khuc nay la ', user);
      try {
        const data = await customerApi.myTicket(user.id);
        setTickets(data);
      } catch (ex) {
        console.log("error", ex);
      }
    };
    getData();
  }, []);
  return (
    <div className="hero-bg text-white overflow-x-hidden">
      <div className="film-grain"></div>
      <main className="relative z-10 py-18">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl md:text-5xl font-black font-serif leading-tight text-white mb-12">
            Lịch sử đặt vé của tôi
          </h1>

          {tickets.length > 0 ? (
            <div className="space-y-6">
              {tickets.map((ticket, index) => (
                <TicketCard key={index} {...ticket} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}