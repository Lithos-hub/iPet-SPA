import dayjs from "dayjs";

export interface CalendarEvent {
  title: string;
  bgColor: string;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  description: string;
  userId: string;
  date_type: "select_unique" | "select_range";
}

export interface CalendarEvent_Backend extends CalendarEvent {
  id: number | null;
  createAt: string;
  updateAt?: string;
}
