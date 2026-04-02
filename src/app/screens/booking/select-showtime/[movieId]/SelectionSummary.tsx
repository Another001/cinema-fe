import { format as formatValue, isValid, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

interface Props {
  date: string | null;
  cinema: string | null;
  time: string | null;
  format: string | null;
}

export default function SelectionSummary({ date, cinema, time, format }: Props) {
  const formattedDate = (() => {
    if (!date) {
      return "Chá»n ngÃ y";
    }

    const parsedDate = parseISO(date);
    return isValid(parsedDate)
      ? formatValue(parsedDate, "dd/MM/yyyy", { locale: vi })
      : date;
  })();

  const formattedTime = (() => {
    if (!time) {
      return "Chá»n giá»";
    }

    const parsedTime = parseISO(time);
    return isValid(parsedTime) ? formatValue(parsedTime, "HH:mm") : time;
  })();

  const items = [
    { label: "Ngày chiếu", value: date || "Chọn ngày" },
    { label: "Rạp phim", value: cinema || "Chọn rạp" },
    { label: "Suất chiếu", value: time || "Chọn giờ" },
    { label: "Định dạng", value: format || "-" },
  ];

  items[0].value = formattedDate;
  items[2].value = formattedTime;

  if (!date) {
    items[0].value = "Chon ngay";
  }

  if (!time) {
    items[2].value = "Chon gio";
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6 mb-8">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">
            {item.label}
          </span>
          <span className="text-yellow-500 font-bold truncate">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
