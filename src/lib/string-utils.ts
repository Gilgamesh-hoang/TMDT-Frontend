import { OrderStatus, orderStatusVN } from "@/types/order";
import { PaymentStatus, paymentStatusVN } from "@/types/payment";
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

export const translateToVN = (input: OrderStatus | PaymentStatus): string => {
  return (
    orderStatusVN[input as OrderStatus] ||
    paymentStatusVN[input as PaymentStatus]
  );
};
