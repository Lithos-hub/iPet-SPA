import enUS from "date-fns/locale/en-US";
import esES from "date-fns/locale/es";
import { addHours, format, parse, startOfWeek, getDay } from "date-fns";
import { dateFnsLocalizer } from "react-big-calendar";

const locales = {
  en: enUS,
  es: esES,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
