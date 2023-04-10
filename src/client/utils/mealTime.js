import { format } from "date-fns";

export const mealTime = (date) => {
  const currentDate = new Date(date);
  return format(currentDate, "dd MMM yyyy, HH:mm");
};
