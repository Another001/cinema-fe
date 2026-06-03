export const changeToHourMinute = (time : string) => {
  if(!time || time.length < 17)
    return;
  return time.slice(11, 16);
}