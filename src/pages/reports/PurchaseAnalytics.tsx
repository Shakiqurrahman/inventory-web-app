import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PurchaseAnalytics = () => {
  const labels = [
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
    "Dec",
  ];

  const sold = [
    75000, 92000, 76000, 74000, 98000, 100000, 82000, 90000, 91000, 85000,
    88000, 90000,
  ];
  const purchased = [
    45000, 50000, 47000, 46000, 55000, 60000, 48000, 51000, 53000, 50000, 52000,
    54000,
  ];

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Sold",
        data: sold,
        backgroundColor: "#D1D5DB", // Tailwind gray-300
        borderRadius: 4,
        barThickness: 20,
        barPercentage: 0.4,
        categoryPercentage: 0.6,
      },
      {
        label: "Purchased",
        data: purchased,
        backgroundColor: "#9CA3AF", // Tailwind gray-400
        borderRadius: 4,
        barThickness: 20,
        barPercentage: 0.4,
        categoryPercentage: 0.6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"bar">) => {
            const value = tooltipItem.raw as number;
            return `৳${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val) => `৳${val}`,
        },
        grid: {
          color: "#E5E7EB",
        },
        border: {
          display: true,
          width: 3, // ⬅️ Thicker Y-axis line
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: true,
          width: 3, // ⬅️ Thicker X-axis line
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-700">Purchase Analytics</h2>
        <select className="text-sm px-3 py-1 border border-gray-300 rounded text-gray-500 outline-none">
          <option value="2024">2024</option>
        </select>
      </div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default PurchaseAnalytics;
