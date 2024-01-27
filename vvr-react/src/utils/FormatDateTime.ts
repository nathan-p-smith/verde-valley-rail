import { format } from "date-fns";

const formatDateTime = (input: string): string => {
  return format(new Date(input), "MM/dd/yyyy h:mm aa");
};

export default formatDateTime;
