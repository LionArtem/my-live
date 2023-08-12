const getTimeLocal = (date) => {
  const timeLocal = new Date(date).toString();
  const arrTimeLocal = timeLocal.split(' ');
  const [month, number, year, time] = arrTimeLocal.slice(1, 5);
  const strTimeLocal = `${month} ${number} ${year} ${time}`;
  return strTimeLocal;
};

export { getTimeLocal };
