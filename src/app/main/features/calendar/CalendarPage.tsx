import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Calendar, View } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "@/scss/customCalendar/styles.scss";

import { getMessages, localizer } from "@/helpers";

import { Button } from "@/components/Button";
import { ModalLayout } from "@/components/Modal/ModalLayout";

import { Input } from "@/components/Form/Input";
import { TextArea } from "@/components/Form/TextArea";
import { CalendarEvent } from "@/app/main/features/calendar/components/CalendarEvent";

import { useUIStore } from "@/hooks";
import { TextField } from "@mui/material";

import dayjs from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/en";
import "dayjs/locale/es";

import { NotificationModal } from "@/components/Modal/NotificationModal";
import { ColorPicker } from "@/components/Form/ColorPicker";
import { DataDisplay } from "@/components/Modal/DataDisplay";
import { useGetUserQuery } from "@/services/apis";
import { User } from "@/models/interfaces/User";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const DragAndDropCalendar = withDragAndDrop(Calendar);

export const CalendarPage = () => {
  // RTK
  const { data: user, refetch } = useGetUserQuery();
  const { events: eventsData } = user as User;

  const { t } = useTranslation();

  const [formState, setFormState] = useState({
    start: dayjs(new Date()),
    bgColor: "bg-neutral-500",
    allDay: false,
    end: dayjs(new Date()),
    title: "",
    description: "",
  });
  const [showNotification, setShowNotification] = useState(false);

  const { start, end, title, description, bgColor } = formState;

  const [currentView, setCurrentView] = useState(
    localStorage.getItem("view") || "week"
  );

  const { crud } = useSelector((state: RootState) => state.modalStore);

  const { setOpenFormModal, setOpenCrudModal, setCloseModals } = useUIStore();

  // const moveEvent = useCallback(
  //   ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }: any) => {
  //     const { allDay } = event;
  //     if (!allDay && droppedOnAllDaySlot) {
  //       event.allDay = true;
  //     }

  //     setMyEvents((prev: any[]) => {
  //       const existing = prev.find((ev) => ev.id === event.id) ?? {};
  //       const filtered = prev.filter((ev) => ev.id !== event.id);
  //       return [...filtered, { ...existing, start, end, allDay }];
  //     });
  //   },
  //   [setMyEvents]
  // );

  // const resizeEvent = useCallback(
  //   ({ event, start, end }: any) => {
  //     setMyEvents((prev: any[]) => {
  //       const existing = prev.find((ev) => ev.id === event.id) ?? {};
  //       const filtered = prev.filter((ev) => ev.id !== event.id);
  //       return [...filtered, { ...existing, start, end }];
  //     });
  //   },
  //   [setMyEvents]
  // );

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
    // setActiveEvent({
    //   _id: 0,
    //   title: "",
    //   allDay: false,
    //   bgColor: "bg-neutral-500",
    //   start: dayjs(new Date()),
    //   end: dayjs(new Date()),
    //   description: "",
    // });
    setOpenFormModal("CREATE");
  };

  const onInputChange = ({
    target,
  }: {
    target: HTMLInputElement | HTMLTextAreaElement | any;
  }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  const onSelect = (event: object) => {
    // setActiveEvent(event as CalendarEvent);
    setOpenCrudModal();
  };

  const onEdit = () => {
    setCloseModals();
    setOpenFormModal("EDIT");
  };

  const onDelete = async () => {
    setCloseModals();
    // await deleteEvent(formState as CalendarEvent);
  };

  const onViewChange = (event: View) => {
    localStorage.setItem("view", event);
    setCurrentView(event);
  };

  const onSubmit = async () => {
    // await startSavingEvent(formState as CalendarEvent);
    setCloseModals();
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
          <DragAndDropCalendar
            culture="es"
            localizer={localizer}
            events={eventsData}
            defaultView={currentView as View}
            // onEventDrop={moveEvent}
            // onEventResize={resizeEvent}
            resizable
            style={{ height: "70vh" }}
            messages={getMessages()}
            components={{
              event: CalendarEvent,
            }}
            eventPropGetter={(event: any) => {
              const backgroundColor = parseEventColor(event.bgColor);
              return { style: { backgroundColor } };
            }}
            onSelectEvent={onSelect}
            onView={onViewChange}
          />
        </div>
      </main>

      <ModalLayout title={t(`CALENDAR.${crud}`)} onAccept={onSubmit}>
        <form className="flex flex-col gap-5">
          <div className="flex gap-5">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={localStorage.getItem("i18nextLng") as string}
            >
              <DateTimePicker
                label="Fecha de inicio"
                value={start}
                minDate={dayjs("1950-01-01")}
                onChange={(value) => {
                  onInputChange({ target: { name: "start", value } });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={localStorage.getItem("i18nextLng") as string}
            >
              <DateTimePicker
                label="Fecha de fin"
                value={end}
                minDate={start}
                onChange={(value) => {
                  onInputChange({ target: { name: "end", value } });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <hr className="my-5 border-slate-900" />

          <label className="font-medium mr-auto p-2 text-black">Color</label>
          <ColorPicker
            onColorClick={(value: string) => {
              onInputChange({ target: { name: "bgColor", value } });
            }}
            activeColor={bgColor}
          />
          <Input
            label="Título"
            placeholder="Título del evento"
            type="text"
            bordered
            name="title"
            onChange={onInputChange}
            value={title}
          />
          <TextArea
            label="Descripción"
            placeholder="Descripción del evento"
            bordered
            name="description"
            onChange={onInputChange}
            value={description}
          />
        </form>
      </ModalLayout>
      <NotificationModal
        open={showNotification}
        close={() => setShowNotification(false)}
        onAccept={onDelete}
        subtitle="Vas a eliminar un evento. Estás seguro?"
      >
        <>
          <div className="flex justify-between gap-5">
            <DataDisplay
              title={t("CALENDAR.start_date")}
              data={dayjs(start).format("DD MMM YYYY HH:mm")}
            />
            <DataDisplay
              title={t("CALENDAR.end_date")}
              data={dayjs(end).format("DD MMM YYYY HH:mm")}
            />
            <DataDisplay
              title={t("CALENDAR.event_title")}
              data={title.toString()}
            />
            <DataDisplay
              title={t("CALENDAR.event_desc")}
              data={description.toString()}
            />
          </div>
        </>
      </NotificationModal>
    </>
  );
};
