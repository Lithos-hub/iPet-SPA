import { FC, useMemo, RefObject, useRef, useState } from "react";
import { RootState } from "@/store";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Formik } from "formik";

import { ModalLayout } from "@/components/Modal/ModalLayout";

import { Input } from "@/components/Form/Input";
import { TextArea } from "@/components/Form/TextArea";

import { TextField } from "@mui/material";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ColorPicker } from "@/components/Form/ColorPicker";

import {
  CalendarEvent,
  CalendarEvent_Backend,
} from "@/models/interfaces/CalendarEvent";

import dayjs from "dayjs";
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from "@/services/apis/eventsApi";
import { useGetUserQuery } from "@/services/apis";
import { useUIStore } from "@/hooks";
import { RadioBox } from "@/components/Form/RadioBox";

interface Props {
  id: number | string;
}

export const AddEventForm: FC<Props> = ({ ...props }) => {
  const formRef: RefObject<HTMLFormElement> = useRef(null);

  const { t } = useTranslation();
  const { crud } = useSelector((state: RootState) => state.modalStore);
  const { user } = useSelector((state: RootState) => state.userStore);

  const { setCloseModals } = useUIStore();

  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const { refetch } = useGetUserQuery();

  const activeEvent = useMemo<CalendarEvent_Backend | CalendarEvent>(
    () =>
      user?.events.find(
        (event_cal: CalendarEvent_Backend) => event_cal.id === props.id
      ) || {
        title: "",
        bgColor: "bg-neutral-500",
        start: dayjs(new Date()),
        end: dayjs(new Date()),
        description: "",
        date_type: "select_unique",
        userId: "",
      },
    [props.id, user]
  );

  const onAccept = () => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  return (
    <ModalLayout title={t(`CALENDAR.${crud}`)} onAccept={onAccept}>
      <Formik
        initialValues={activeEvent as CalendarEvent | CalendarEvent_Backend}
        validate={(values) => {
          const errors = {} as Record<string, string>;
          if (!values.start) errors.start = t("UI.ERRORS.event_start");
          if (!values.title) errors.title = t("UI.ERRORS.event_title");
          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          const dataToBackend = {
            ...values,
            userId: localStorage.getItem("id"),
          };

          if (dataToBackend.date_type === "select_unique") {
            dataToBackend.end = dataToBackend.start;
          }

          if ((dataToBackend as CalendarEvent_Backend).id) {
            await updateEvent(dataToBackend as CalendarEvent_Backend);
          } else {
            await createEvent(dataToBackend as CalendarEvent_Backend);
          }
          await refetch();
          setCloseModals();
          resetForm();
        }}
      >
        {({
          values,
          errors,
          handleChange,
          getFieldProps,
          handleSubmit,
          setFieldValue,
        }) => (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-5"
          >
            <div>
              <Input
                {...getFieldProps(values.title)}
                label={t("CALENDAR.event_title")}
                placeholder={t("CALENDAR.event_title_placeholder") as string}
                name="title"
                hasError={!!errors.title}
                value={values.title}
                errorMessage={t(`${errors.title}`) as string}
              />
              <TextArea
                {...getFieldProps(values.description)}
                label={t("CALENDAR.event_description")}
                placeholder={
                  t("CALENDAR.event_description_placeholder") as string
                }
                name="description"
                value={values.description}
              />
            </div>
            <div>
              <label className="font-medium mr-auto p-2 text-black">
                {t("CALENDAR.event_color")}
              </label>
              <ColorPicker
                name="bgColor"
                onColorClick={(value) => {
                  handleChange({
                    target: { name: "bgColor", value },
                  });
                }}
                activeColor={values.bgColor}
                value={values.bgColor}
              />
            </div>

            <div>
              <label className="font-medium mr-auto p-2 text-black">
                {t("CALENDAR.event_selection_type")}
              </label>
              <div className="flex gap-5 mt-5">
                <RadioBox
                  name="date_type"
                  title="Fecha única"
                  value="select_unique"
                  onChange={() => setFieldValue("date_type", "select_unique")}
                  checked={values.date_type === "select_unique"}
                />
                <RadioBox
                  name="date_type"
                  title="Rango"
                  value="select_range"
                  onChange={() => setFieldValue("date_type", "select_range")}
                  checked={values.date_type === "select_range"}
                />
              </div>
            </div>

            <div className="flex gap-5 w-full items-end">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={localStorage.getItem("i18nextLng") as string}
              >
                <DateTimePicker
                  label={`${
                    values.date_type === "select_unique"
                      ? t("CALENDAR.event_event_date")
                      : t("CALENDAR.event_start_date")
                  }`}
                  value={values.start}
                  minDate={dayjs("1950-01-01")}
                  onChange={(value) => {
                    handleChange({
                      target: { name: "start", value },
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              {values.date_type === "select_range" && (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={localStorage.getItem("i18nextLng") as string}
                >
                  <DateTimePicker
                    label={t("CALENDAR.event_end_date")}
                    value={
                      values.date_type === "select_range"
                        ? values.end
                        : values.start
                    }
                    minDate={values.start}
                    onChange={(value) => {
                      handleChange({
                        target: { name: "end", value },
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              )}
            </div>
          </form>
        )}
      </Formik>
    </ModalLayout>
  );
};
