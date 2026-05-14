import { changeToHourMinute } from "@/src/utils/datetime";
import { Check } from "lucide-react";

interface MessageProps {
  type: 'in' | 'out';
  text: string;
  time: string;
  name?: string;
  color?: string;
  seen?: boolean;
}

export default function MessageItem({ type, text, time, name, color, seen }: MessageProps) {
  const isOut = type === 'out';

  return (
    <div className={`flex ${isOut ? 'justify-end' : 'justify-start'} msg-anim`}>
      <div className={`max-w-[70%] min-w-[70px] px-3 pb-1.5 pt-3 rounded-2xl ${isOut ? 'msg-out bg-[#202b36] rounded-br-md' : 'msg-in bg-[#2b5278] rounded-bl-md'}`}>
        {name && (
          <p className={`text-xs font-semibold ${color || 'text-blue-400'} mb-0.5`}>
            {name}
          </p>
        )}
        <p className="text-sm whitespace-pre-wrap break-words">{text}</p>
        <div className={`flex items-center gap-1 mt-1 ${isOut ? 'justify-end' : 'float-right ml-2'}`}>
          <span className={`text-[10px] ${isOut ? 'text-sky-200/80' : 'text-gray-400'}`}>
            {changeToHourMinute(time)}
          </span>
          {isOut && seen && <Check size={14} className="text-sky-200" />}
        </div>
      </div>
    </div>
  );
}