import { useTranslation } from "react-i18next";

export const getMessages = () => {
  const { t } = useTranslation();
  return {
    allDay: t("CALENDAR.UI.allDay"),
    previous: t("CALENDAR.UI.previous"),
    next: t("CALENDAR.UI.next"),
    today: t("CALENDAR.UI.today"),
    month: t("CALENDAR.UI.month"),
    week: t("CALENDAR.UI.week"),
    day: t("CALENDAR.UI.day"),
    agenda: t("CALENDAR.UI.agenda"),
    date: t("CALENDAR.UI.date"),
    time: t("CALENDAR.UI.time"),
    event: t("CALENDAR.UI.event"),
    noEventsInRange: t("CALENDAR.UI.noEventsInRange"),
    showMore: (total: number) => `${t("CALENDAR.UI.showMore")} ${total}`,
  };
};
