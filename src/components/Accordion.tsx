'use client';

import { useState } from 'react';

interface AccordionProps {
  title: string;
  children?: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-y-auto scrollbar-thin">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 hover:bg-gray-900 font-bold flex justify-between items-center transition"
      >
        {title}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {/* Nội dung sẽ xuất hiện ở đây */}
      {isOpen && (
        <div>
          {children}  
        </div>
      )}
    </div>
  );
}