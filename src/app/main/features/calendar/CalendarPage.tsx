import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Calendar, View } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "@/scss/customCalendar/styles.scss";

import { getMessages, localizer } from "@/helpers";

import { Button } from "@/components/Button";

import { CalendarEvent } from "@/app/main/features/calendar/components/CalendarEvent";

import { useUIStore } from "@/hooks";

import "dayjs/locale/en";
import "dayjs/locale/es";

import { NotificationModal } from "@/components/Modal/NotificationModal";
import { DataDisplay } from "@/components/Modal/DataDisplay";
import { useGetUserQuery } from "@/services/apis";
import { User } from "@/models/interfaces/User";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { AddEventForm } from "./components/AddEventForm";
import { useDeleteEventMutation } from "@/services/apis/eventsApi";
import dayjs from "dayjs";
import { useParseDate } from "@/hooks/useParseDate";
import { CalendarEvent_Backend } from "@/models/interfaces/CalendarEvent";
import { SelectOptionModal } from "@/components/Modal/SelectOptionModal";

export const CalendarPage = () => {
  const { format } = useParseDate();
  // RTK
  const { data: user, refetch } = useGetUserQuery();
  const { events: eventsData } = user as User;
  const [eventId, setEventId] = useState<number | null>(null);

  const [deleteEvent] = useDeleteEventMutation();

  const { t } = useTranslation();

  const [showNotification, setShowNotification] = useState(false);
  const [showSelectOption, setShowSelectOption] = useState(false);

  const [currentView, setCurrentView] = useState(
    localStorage.getItem("view") || "week"
  );

  const { setOpenFormModal, setOpenCrudModal, setCloseModals } = useUIStore();

  const events = useMemo(() => {
    return eventsData.map((event) => {
      return {
        ...event,
        start: format(event.start.toString()),
        end: format(event.end.toString()),
      };
    });
  }, [eventsData]);

  const parseEventColor = (tailwindColor: string) => {
    const options = {
      "bg-neutral-500": "#737373",
      "bg-red-500": "#ef4444",
      "bg-orange-500": "#f97316",
      "bg-amber-500": "#f59e0b",
      "bg-yellow-500": "#eab308",
      "bg-lime-500": "#84cc16",
      "bg-teal-500": "#14b8a6",
      "bg-blue-500": "#3b82f6",
      "bg-violet-500": "#8b5cf6",
      "bg-purple-500": "#a855f7",
      "bg-pink-500": "#ec4899",
      "bg-rose-500": "#f43f5e",
    };

    return options[tailwindColor as keyof typeof options];
  };

  const onCreateClick = () => {
    setOpenFormModal("CREATE");
  };

  const onSelect = ({ id }: CalendarEvent_Backend) => {
    setShowSelectOption(true);
    setEventId(id);
  };

  const onEdit = () => {
    setShowSelectOption(false);
    setOpenFormModal("EDIT");
  };

  const triggerDelete = async () => {
    setShowSelectOption(false);
    await deleteEvent(eventId as number);
    await refetch();
    setShowNotification(false);
  };

  const showNotificationModal = (bool: boolean) => setShowNotification(bool);

  const onViewChange = (event: View) => {
    localStorage.setItem("view", event);
    setCurrentView(event);
  };

  return (
    <>
      <header className="flex justify-between items-center mb-5">
        <h2 className="text__primary--gradient">{t("CALENDAR.title")}</h2>
        <Button
          variant="primary"
          title={t("CALENDAR.CREATE") as string}
          onClick={onCreateClick}
        />
      </header>

      <main className="bg-white shadow-lg rounded-xl p-5">
        <div className="flex flex-col gap-5">
          <Calendar
            culture="es"
            localizer={localizer}
            events={events}
            defaultView={currentView as View}
            style={{ height: "70vh" }}
            messages={getMessages()}
            components={{
              event: CalendarEvent,
            }}
            eventPropGetter={(event: any) => {
              const backgroundColor = parseEventColor(event.bgColor);
              return { style: { backgroundColor } };
            }}
            onSelectEvent={(e: unknown) => onSelect(e as CalendarEvent_Backend)}
            onView={onViewChange}
          />
        </div>
      </main>
      <AddEventForm id={eventId as number} />
      <NotificationModal
        open={showNotification}
        subtitle="Vas a borrar un evento. ¿Deseas continuar?"
        close={() => showNotificationModal(false)}
        onAccept={triggerDelete}
      >
        <img src="/3d-icons/dog-crying.png" className="h-[200px] mx-auto" />
      </NotificationModal>
      <SelectOptionModal
        close={() => setShowSelectOption(false)}
        open={showSelectOption}
      >
        <div className="flex gap-5 justify-between">
          <Button
            variant="primary"
            title={t("CALENDAR.EDIT") as string}
            onClick={onEdit}
          />
          <Button
            variant="danger"
            title={t("CALENDAR.DELETE") as string}
            onClick={triggerDelete}
          />
        </div>
      </SelectOptionModal>
    </>
  );
};
