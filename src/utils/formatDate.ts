import { parse, formatISO } from 'date-fns';

export const combineToISO = (dateStr: string, timeStr: string) => {
  if (!dateStr || !timeStr) return "";
  const combinedStr = `${dateStr} ${timeStr}`;
  const parsedDate = parse(combinedStr, 'yyyy-MM-dd HH:mm', new Date());
  return parsedDate;
};