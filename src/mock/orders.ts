import { Order } from "@/types/order";

export const mockOrders: Order[] = [
  {
    id: 1,
    date: "2025-04-07",
    customerName: "Alice Johnson",
    total: 249990,
    status: "Success",
  },
  {
    id: 2,
    date: "2025-04-06",
    customerName: "Bob Smith",
    total: 3232921,
    status: "Pending",
  },
  {
    id: 3,
    date: "2025-04-05",
    customerName: "Charlie Brown",
    total: 310231,
    status: "Processing",
  },
  {
    id: 4,
    date: "2025-04-04",
    customerName: "Dana White",
    total: 312.0,
    status: "Failed",
  },
  {
    id: 5,
    date: "2025-04-03",
    customerName: "Ethan Lee",
    total: 59.99,
    status: "Success",
  },
];
