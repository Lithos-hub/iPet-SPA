import dayjs from "dayjs";

export interface CalendarEvent {
  _id?: number | null;
  title: string;
  allDay: boolean;
  bgColor: string;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  description: string;
}
