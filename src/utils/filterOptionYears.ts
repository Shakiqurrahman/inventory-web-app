export const getYearOptions = () => {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();

  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push({
      label: `${year}`,
      value: `${year}`,
    });
  }

  return years.reverse();
};

export const getDateFilterOptions = () => {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const staticOptions = [
    { label: "Today", value: "today" },
    { label: "7 Days", value: "7_days" },
    { label: "This Month", value: "this_month" },
    { label: "Last Month", value: "last_month" },
    { label: "6 Months", value: "6_months" },
    { label: "This Year", value: `${currentYear}` },
    { label: "Last Year", value: `${lastYear}` },
  ];

  const yearOptions = [];
  for (let year = startYear; year <= lastYear - 1; year++) {
    yearOptions.push({
      label: `${year}`,
      value: `${year}`,
    });
  }

  yearOptions.reverse();

  const allTimeOption = { label: "All Time", value: "all_time" };

  return [...staticOptions, ...yearOptions, allTimeOption];
};
