export const createDate = function () {
  const currentDate = new Date();

  const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  const day = formatNumber(currentDate.getDate(), 2);
  const month = formatNumber(currentDate.getMonth() + 1, 2);
  const year = currentDate.getFullYear();
  const hour = formatNumber(currentDate.getHours(), 2);
  const minutes = formatNumber(currentDate.getMinutes(), 2);

  const weekday = days[currentDate.getDay()];

  function formatNumber(number, position) {
    return number.toString().padStart(position, "0");
  }
  return `${weekday}: ${day}.${month}.${year} - ${hour}:${minutes}`;
};
