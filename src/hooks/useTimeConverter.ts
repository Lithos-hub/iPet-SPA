import { useTranslation } from "react-i18next";

export const useTimeConverter = (startDate: number, endDate: Date) => {
  const { t } = useTranslation();
  const start = new Date(startDate);
  let today;
  if (!endDate) {
    today = new Date();
  } else {
    today = new Date(endDate);
  }
  // Get the difference between the two dates in years and months
  const diff = new Date(today.getTime() - start.getTime());
  const diffYears = diff.getUTCFullYear() - 1970;
  const diffMonths = diff.getUTCMonth();
  return `${t(`UI.DATES.year`, { count: diffYears })}, ${t(`UI.DATES.month`, {
    count: diffMonths,
  })}`;
};
