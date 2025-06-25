import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    type ChartData,
    type ChartOptions,
    type ScriptableContext,
    type TooltipItem,
} from "chart.js";
import { type FC } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);

const SalesOverviewChart: FC = () => {
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

    const orders = [
        20000, 30000, 50000, 70000, 90000, 100000, 95000, 85000, 65000, 45000,
        30000, 20000,
    ];
    const profit = [
        12000, 15000, 20000, 30000, 40000, 52000, 50000, 42000, 32000, 20000,
        15000, 10000,
    ];

    const data: ChartData<"line"> = {
        labels,
        datasets: [
            {
                label: "Orders",
                data: orders,
                fill: true,
                backgroundColor: (ctx: ScriptableContext<"line">) => {
                    const gradient = ctx.chart.ctx.createLinearGradient(
                        0,
                        0,
                        0,
                        400
                    );
                    gradient.addColorStop(0, "rgba(167, 139, 250, 0.3)");
                    gradient.addColorStop(1, "rgba(167, 139, 250, 0)");
                    return gradient;
                },
                borderColor: "#A78BFA",
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
            },
            {
                label: "Profit",
                data: profit,
                fill: true,
                backgroundColor: (ctx: ScriptableContext<"line">) => {
                    const gradient = ctx.chart.ctx.createLinearGradient(
                        0,
                        0,
                        0,
                        400
                    );
                    gradient.addColorStop(0, "rgba(110, 231, 183, 0.3)");
                    gradient.addColorStop(1, "rgba(110, 231, 183, 0)");
                    return gradient;
                },
                borderColor: "#5EEAD4",
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            legend: {
                display: false, // ✅ hide legend
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem: TooltipItem<"line">) => {
                        const value = tooltipItem.raw as number;
                        return `৳${value.toLocaleString()}`;
                    },
                    title: (tooltipItems: TooltipItem<"line">[]) => {
                        return `Month: ${tooltipItems[0].label}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `৳${value}`,
                },
            },
        },
    };

    return (
        <div className="p-4 bg-white dark:bg-stone-700 dark:text-gray-300 h-full">
            <div className="flex justify-between gap-3 items-center mb-5">
                <div className="flex items-center gap-1 text-xs">
                    <span className="w-3 h-3 rounded-full bg-[#A78BFA]"></span>
                    <p>Sales</p>
                </div>
                <div className="flex items-center gap-1 text-xs mr-auto">
                    <span className="w-3 h-3 rounded-full bg-[#5EEAD4]"></span>
                    <p>Profit</p>
                </div>
                <select className="text-sm px-3 py-1 border border-gray-300 rounded text-gray-500 dark:text-gray-300 outline-none">
                    <option value="2024">2024</option>
                </select>
            </div>
            <Line options={options} data={data} />
        </div>
    );
};

export default SalesOverviewChart;
