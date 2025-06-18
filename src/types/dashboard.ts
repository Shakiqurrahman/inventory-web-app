export interface IWeeklySale {
  dayDate: string;
  day: string;
  salesAmount: number;
  saleItems: number;
}

export interface IDashboardOverview {
  totalSales: number;
  totalCustomers: number;
  totalProducts: number;
  totalEmployees: number;
}
