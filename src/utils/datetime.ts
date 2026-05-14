export const changeToHourMinute = (time : string) => {
  if(!time)
    return;
  return time.slice(11, 16);
}