import { Doughnut } from "react-chartjs-2";

const SaleAnalytics = () => {
    const data = {
        datasets: [
            {
                label: "Sale Analytics",
                data: [45, 35, 20],
                backgroundColor: ["#A78BFA", "#5EEAD4", "#F9A8D4"], // Purple, Green, Pink
                borderWidth: 5,
                // borderRadius: 30,
                borderColor: "#fff",
                cutout: "75%",
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };
    return (
        <div className="bg-white dark:bg-stone-700 p-4 h-full flex flex-col justify-center">
            <div className="relative flex justify-center items-center px-10 xl:px-16">
                <Doughnut data={data} options={options} />
                <div className="absolute text-center">
                    <p className="text-3xl lg:text-5xl font-bold text-gray-800 dark:text-gray-300">
                        90%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-200">
                        Total completed
                    </p>
                </div>
            </div>
            <div className="mt-4 text-sm space-y-1 dark:text-gray-300">
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#A78BFA]"></span>{" "}
                        Completed
                    </span>
                    <span className="text-[#A78BFA]">70%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#5EEAD4]"></span>{" "}
                        Distributed
                    </span>
                    <span className="text-[#5EEAD4]">15%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#F9A8D4]"></span>{" "}
                        Returned
                    </span>
                    <span className="text-[#F9A8D4]">05%</span>
                </div>
            </div>
        </div>
    );
};

export default SaleAnalytics;
