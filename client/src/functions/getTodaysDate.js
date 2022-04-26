export const getTodaysDate = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hour = newDate.getHours();
  const mins = newDate.getMinutes();

  return `${day}-${month}-${year} ${hour}:${mins}`;
}