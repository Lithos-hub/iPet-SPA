import { useEffect, useMemo, useState } from "react";

import PetsIcon from "@mui/icons-material/Pets";
import { useParseDate } from "@/hooks/useParseDate";
import { GradientIcon } from "@/components/GradientIcon";
import { useGetUserQuery } from "@/services/apis";
import { User } from "@/models/interfaces/User";
import { Note_Backend } from "@/models/interfaces/Note";
import { useGetNewsQuery, useGetTipsQuery } from "@/services/apis/newsApi";
import { useTranslation } from "react-i18next";

import { CalendarEvent_Backend } from "@/models/interfaces/CalendarEvent";
import dayjs from "dayjs";
import { NewsApi } from "@/models/interfaces/News";
import { Result } from "@/models/interfaces/News";

export const HomePage = () => {
  const { t } = useTranslation();
  const { format } = useParseDate();
  const { data: user } = useGetUserQuery();
  const { data: news } = useGetNewsQuery(null);
  const { data: tips } = useGetTipsQuery(null);

  const {
    vets: vetsData,
    notes: notesData,
    contacts: contactsData,
    events: eventsData,
  } = user as User;

  const tipOfTheDay = useMemo(
    () => (tips ? tips.articles.results.at(0) : null),
    [news]
  );

  const nextAppointmentStart = useMemo(() => {
    if (eventsData && eventsData.length > 0) {
      const startDates = eventsData.map(({ start }: CalendarEvent_Backend) =>
        new Date(start.toString()).getTime()
      );
      const today = new Date().getTime();
      return startDates.filter((date) => date > today).shift();
    }
  }, [eventsData]);

  const importantNotes = useMemo(() => {
    if (notesData && notesData.length > 0) {
      return notesData.filter(({ important }) => important);
    }
  }, [notesData]);

  return (
    <div className="flex flex-col gap-5">
      <main className="bg-white shadow-lg rounded-xl p-5 dark:bg-slate-700">
        <section className="grid grid-cols-3 bg-primary rounded-xl shadow-xl p-5 gap-5">
          <article className="bg-white rounded-xl shadow-xl p-5 relative flex flex-col gap-5 dark:bg-slate-800 dark:text-white">
            <img
              src={`/3d-icons/calendar-alt.png`}
              className="h-[80px] absolute -top-[40px] -right-5 z-20"
            />
            <h3 className="text__primary--gradient dark:brightness-150">
              {t("HOME.NEXT_APPOINTMENT")}
            </h3>
            {nextAppointmentStart ? (
              <div className="p-5 text-left text-slate-900 bg-white shadow-xl min-h-[300px] w-full relative mx-auto dark:bg-slate-900 dark:text-white rounded-xl">
                <div
                  className={`${
                    eventsData.at(0)?.bgColor
                  } p-2 rounded-full h-[25px] w-[25px] absolute right-5 top-5`}
                ></div>

                <div className="flex flex-col mb-5">
                  <h1 className="text-6xl xl:text-8xl text-slate-500 opacity-50 dark:text-white">
                    {dayjs(nextAppointmentStart).format("DD")}
                  </h1>
                  <h1 className="text-3xl xl:text-6xl text-slate-500 capitalize dark:text-white">
                    {dayjs(nextAppointmentStart).format("MMMM")}
                  </h1>
                </div>

                <hr className="mb-5" />
                <strong className="text-2xl">
                  {t("CALENDAR.event_title")}
                </strong>
                <p className="p-2">{eventsData.at(0)?.title}</p>
                {eventsData.at(0)?.description && (
                  <>
                    <strong className="text-2xl">
                      {t("CALENDAR.event_description")}
                    </strong>
                    <p className="p-2">{eventsData.at(0)?.description}</p>
                  </>
                )}
              </div>
            ) : (
              <p className="text-red-500">{t("HOME.NO_APPOINTMENT")}</p>
            )}
          </article>
          <article className="bg-white rounded-xl shadow-xl p-5 col-span-2 relative dark:bg-slate-900 dark:text-white">
            <img
              src={`/3d-icons/bulb.png`}
              className="h-[80px] absolute -top-[40px] -right-5 z-20"
            />
            <h2 className="text__primary--gradient font-bold text-center dark:brightness-150">
              {/* {t("HOME.TIP_OF_THE_DAY")} */}
              {tipOfTheDay && tipOfTheDay.title}
            </h2>
            <div className="p-5 text-justify">
              {tipOfTheDay && (
                <>
                  <h4 className="leading-loose">
                    {tipOfTheDay.body.slice(0, 500)}
                  </h4>
                  <a
                    href={tipOfTheDay.url}
                    className="block text-pink-500 font-bold mt-5 hover:underline"
                    target="_blank"
                  >
                    Leer mas
                  </a>
                </>
              )}
            </div>
          </article>
          <article className="bg-white rounded-xl shadow-xl p-5 col-span-2 relative dark:bg-slate-900 dark:text-white">
            <img
              src={`/3d-icons/thumbtack.png`}
              className="h-[80px] absolute -top-[40px] -right-5 z-20"
            />
            <h3 className="text__primary--gradient dark:brightness-150">
              {t("HOME.IMPORTANT_NOTES")}
            </h3>
            {importantNotes && importantNotes.length > 0 ? (
              <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
                {importantNotes.map((item: Note_Backend) => (
                  <div
                    className="post-it relative bg-gradient-to-br 
                      from-[#FEFF9C] to-[#FFF740] text-black h-[200px] 
                      w-full mx-auto p-5 shadow-lg shadow-[#505050] overflow-y-auto"
                  >
                    {item.description}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-500 mt-5">{t("HOME.NO_NOTES")}</p>
            )}
          </article>
          <article className="bg-white rounded-xl shadow-xl p-5 col-span-1 relative dark:bg-slate-900 dark:text-white">
            <img
              src={`/3d-icons/news.png`}
              className="h-[80px] absolute -top-[40px] -right-5 z-20"
            />
            <h3 className="text__primary--gradient dark:brightness-150">
              {t("HOME.NEWS")}
            </h3>
            {news ? (
              news.articles.results
                .slice(0, 3)
                .map(({ title, body, url }: any, index: number) => {
                  return (
                    <div key={index}>
                      <strong className="p-2 block text-justify">
                        {title}
                      </strong>
                      <p className="p-2 text-justify">
                        {body.slice(0, 250)}[...]
                      </p>
                      <a
                        href={url}
                        className="block text-pink-500 font-bold mb-5 p-2 hover:underline"
                        target="_blank"
                      >
                        Leer mas
                      </a>
                    </div>
                  );
                })
            ) : (
              <div>No news found</div>
            )}
          </article>
        </section>
      </main>
    </div>
  );
};
