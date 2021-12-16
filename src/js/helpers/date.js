import { format } from "date-fns";

export default function formatDate(str, type) {
  const date = new Date(str);
  return format(date, type);
}
