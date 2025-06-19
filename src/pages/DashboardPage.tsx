import { IoCartOutline } from "react-icons/io5";
import { LiaIdCard } from "react-icons/lia";
import { PiClock } from "react-icons/pi";
import { SlPeople } from "react-icons/sl";
import { TfiCloudDown, TfiHarddrive, TfiShoppingCart } from "react-icons/tfi";
import { Link } from "react-router";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type TooltipItem,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  useGetDashboardOverviewQuery,
  useGetPieChartDataQuery,
  useGetWeeklySalesQuery,
} from "../redux/features/dashboard/dashboardApi";
import type { IWeeklySale } from "../types/dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const { data: dashboardOverview } = useGetDashboardOverviewQuery(null);
  const { data: pieChartData } = useGetPieChartDataQuery(null);
  const { data: weeklySales = [] } = useGetWeeklySalesQuery(null);

  const labels = weeklySales.map((item) => item.day);
  const data = {
    labels: labels,
    parsing: false,
    datasets: [
      {
        label: "Weekly Sales",
        data: weeklySales.map((d) => ({
          x: d.day,
          y: d.salesAmount,
          raw: d, // Keep the full object for tooltip access
        })),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const piedata = {
    labels: ["Sale", "Corporate Sale", "Return", "Due"],
    datasets: [
      {
        label: "Sales Amount",
        data: [
          pieChartData?.sale,
          pieChartData?.corporateSale,
          pieChartData?.return,
          pieChartData?.due,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const config = {
    data: data,
    options: {
      plugins: {
        legend: {
          position: "top" as const,
        },
        tooltip: {
          callbacks: {
            title: (tooltipItems: TooltipItem<"bar">[]) => {
              const raw = tooltipItems[0].raw as {
                x: string;
                y: number;
                raw: IWeeklySale;
              };
              const rawData = raw.raw;
              return rawData.day;
            },
            label: (tooltipItem: TooltipItem<"bar">) => {
              const raw = tooltipItem.raw as {
                x: string;
                y: number;
                raw: IWeeklySale;
              };
              const rawData = raw.raw;
              return `Total: ৳${rawData.salesAmount}`;
            },
            afterLabel: (tooltipItem: TooltipItem<"bar">) => {
              const raw = tooltipItem.raw as {
                x: string;
                y: number;
                raw: IWeeklySale;
              };
              const rawData = raw.raw;
              return `Sales: ${rawData.saleItems}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <Link
          to={"/sales-history"}
          className="flex justify-between items-center p-1 bg-white shadow-md"
        >
          <div className="ml-4">
            <h1 className="text-3xl font-medium text-blue-500 mb-2">
              {dashboardOverview?.totalSales || 0}
            </h1>
            <p>Total Sales</p>
          </div>
          <div className="flex justify-center items-center size-26 bg-blue-500 text-white">
            <IoCartOutline className="text-4xl" />
          </div>
        </Link>
        <Link
          to={"/customers"}
          className="flex justify-between items-center p-1 bg-white shadow-md"
        >
          <div className="ml-4">
            <h1 className="text-3xl font-medium text-[#6FD64B] mb-2">
              {dashboardOverview?.totalCustomers || 0}
            </h1>
            <p>Total Customers</p>
          </div>
          <div className="flex justify-center items-center size-26 bg-[#6FD64B] text-white">
            <SlPeople className="text-4xl" />
          </div>
        </Link>
        <Link
          to={"/items"}
          className="flex justify-between items-center p-1 bg-white shadow-md"
        >
          <div className="ml-4">
            <h1 className="text-3xl font-medium text-[#FB5D5D] mb-2">
              {dashboardOverview?.totalProducts || 0}
            </h1>
            <p>Total Items</p>
          </div>
          <div className="flex justify-center items-center size-26 bg-[#FB5D5D] text-white">
            <TfiHarddrive className="text-4xl" />
          </div>
        </Link>
        <Link
          to={"/employees"}
          className="flex justify-between items-center p-1 bg-white shadow-md"
        >
          <div className="ml-4">
            <h1 className="text-3xl font-medium text-[#F7941D] mb-2">
              {dashboardOverview?.totalEmployees || 0}
            </h1>
            <p>Total Employees</p>
          </div>
          <div className="flex justify-center items-center size-26 bg-[#F7941D] text-white">
            <LiaIdCard className="text-4xl" />
          </div>
        </Link>
      </div>
      <h1 className="text-center my-4 text-sm">
        Welcome to Fit & Found Point of Sell, choose a common task below to get
        started!
      </h1>
      <div className="grid gap-5 sm:grid-cols-2">
        <Link
          to={"/sales"}
          className="p-3 flex gap-5 items-center bg-white hover:bg-primary hover:text-white duration-200 rounded-sm"
        >
          <TfiShoppingCart className="text-2xl" />
          <span className="h-5 w-px bg-gray-300"></span>
          <h1 className="text-xs font-light">Start a New Sale</h1>
        </Link>
        <Link
          to={"/receiving"}
          className="p-3 flex gap-5 items-center bg-white hover:bg-primary hover:text-white duration-200 rounded-sm"
        >
          <TfiCloudDown className="text-2xl" />
          <span className="h-5 w-px bg-gray-300"></span>
          <h1 className="text-xs font-light">Start a New Receiving</h1>
        </Link>
        <Link
          to={"/reports"}
          className="p-3 flex gap-5 items-center bg-white hover:bg-primary hover:text-white duration-200 rounded-sm"
        >
          <PiClock className="text-2xl" />
          <span className="h-5 w-px bg-gray-300"></span>
          <h1 className="text-xs font-light">Today's closeout report</h1>
        </Link>
        <Link
          to={"/reports"}
          className="p-3 flex gap-5 items-center bg-white hover:bg-primary hover:text-white duration-200 rounded-sm"
        >
          <PiClock className="text-2xl" />
          <span className="h-5 w-px bg-gray-300"></span>
          <h1 className="text-xs font-light">Today's detailed sales report</h1>
        </Link>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-5 mt-5">
        <div className="w-full md:w-2/3 bg-white p-4">
          <Bar {...config} />
        </div>
        <div className="w-full md:w-1/3 bg-white p-4">
          <Pie data={piedata} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
