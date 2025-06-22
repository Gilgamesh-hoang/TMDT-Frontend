import { AdminAccountResponse } from "./models";
import { OrderSummary } from "./order";

export interface DashboardResponse {
  orderCount: number;
  customerCount: number;
  productCount: number;
  totalRevenue: number;
  orderSummaryResponses: OrderSummary[];
  adminAccountResponses: AdminAccountResponse[];
}

export interface CategoryRevenue {
  categoryName: number;
  totalRevenue: number;
}
export interface MonthlyRevenue {
  month: number;
  totalAmount: number;
}
export interface ChartFilterOptions {
  type: string;
  start: string;
  end: string;
}
export interface RevenueItem {
  timeLabel: string;
  totalAmount: number;
}

export interface DailyOrderCount {
  day: number;
  count: number;
}
