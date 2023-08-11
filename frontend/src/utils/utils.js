const getTimeLocal = (date) => {
  const timeLocal = new Date(date).toString();
  const arrTimeLocal = timeLocal.split(' ');
  const strTimeLocal = `${arrTimeLocal[1]} ${arrTimeLocal[2]} ${arrTimeLocal[3]} ${arrTimeLocal[4]} `;
  return strTimeLocal;
};

export { getTimeLocal };
