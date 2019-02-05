import { keyTextValue } from "./../../models/shared.model";
import { Observable } from "rxjs";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const parseDate = date => {
  const newDate = new Date(date);
  let y = newDate.getFullYear();
  let d = newDate.getDate();
  let m = newDate.getMonth();

  // we get the text name of the month by using the value of m to find the corresponding month name
  let mlong = months[m];
  const fullDate = `${mlong} ${d} ${y}`;
  return fullDate;
};

export const parseDateTime = date => {
  let newDate = new Date(date);
  let m = newDate.getMonth(); // returns 6 (note that this number is one less than the number of the month in isoformat)
  let d = newDate.getDate(); // returns 15
  let y = newDate.getFullYear(); // returns 2012
  let h = newDate.getHours();
  let min = newDate.getMinutes();

  // we get the text name of the month by using the value of m to find the corresponding month name
  let mlong = months[m];

  const fullDate = `${mlong} ${d} ${y}, ${h}:${min}Hrs`;
  return fullDate;
};

export const optionRenderer = (options: keyTextValue[], key: string) => {
  let option = options.find(item => item.key === key);
  return option ? option.text : key;
};