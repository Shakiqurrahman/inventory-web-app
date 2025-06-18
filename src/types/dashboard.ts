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

export interface IPieChartData {
  sale: number;
  corporateSale: number;
  return: number;
  due: number;
};
