import { TbCurrencyTaka } from "react-icons/tb";
import { TfiWidget } from "react-icons/tfi";

type ProfitAndLossReportCardProps = {
  name: string;
  value: string | number;
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
};

const ProfitAndLossReportCard = ({
  name,
  value,
  bgColor,
  textColor,
  iconColor,
}: ProfitAndLossReportCardProps) => {
  return (
    <div
      className={`px-4 py-6 flex items-center justify-between ${
        bgColor ? bgColor : "bg-red-500/80"
      } ${textColor ? textColor : "text-white"}`}
    >
      <div className="text-center w-full">
        <span className="flex items-center justify-center text-lg font-medium">
          <TbCurrencyTaka />
          {value}
        </span>
        <p className="text-sm font-light">{name}</p>
      </div>
      <TfiWidget
        className={`shrink-0 text-5xl ${
          iconColor ? iconColor : "text-red-500"
        }`}
      />
    </div>
  );
};

export default ProfitAndLossReportCard;
