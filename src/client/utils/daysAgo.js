export const daysAgo = (date) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const today = new Date();
  const dateObj = new Date(date);
  return Math.round(Math.abs((today - dateObj) / oneDay));
};
