import dayjs from "dayjs";

export const truncateString = (input: string, length: number): string => {
  if (input.length > length) {
    return input.substring(0, length) + "...";
  }
  return input;
};

export const formatDateTime = (dateTime: string) => {
  const time = dayjs(dateTime);
  const formatedDateTime =
    dayjs().diff(time, "day") < 1 ? time.fromNow() : time.format("DD/MM/YYYY");
  return formatedDateTime;
};
export const isValidUUID = (value: string | undefined) => {
  return typeof value === "string" && value.length > 0;
};
