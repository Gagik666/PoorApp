let d = new Date();

const addLeadingZero = (d) => {
  return d < 10 ? `0` + d : d;
};
export const getMinutes = () => {
  return addLeadingZero(d.getMinutes());
};
export const getHours = () => {
  return addLeadingZero(d.getHours());
};
export const getDate = () => {
  return addLeadingZero(d.getDate());
};
export const getMonth = () => {
  return addLeadingZero(d.getMonth() + 1);
};
export const getFullYear = () => {
  return addLeadingZero(d.getFullYear());
};

export const getWorked = (time, timeF) => {
  const timeArr = time.split(":");
  const timeFArr = timeF.split(":");
  return `${timeFArr[0] - timeArr[0]}:${timeFArr[1] - timeArr[1]}`;
};
