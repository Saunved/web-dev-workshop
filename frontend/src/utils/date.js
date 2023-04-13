export const getHumanReadableDate = (machineDate) => {
  const date = new Date(machineDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
