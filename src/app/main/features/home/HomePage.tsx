import { useMemo } from "react";

import PetsIcon from "@mui/icons-material/Pets";
import { useParseDate } from "@/hooks/useParseDate";
import { GradientIcon } from "@/components/GradientIcon";
import { useGetUserQuery } from "@/services/apis";
import { User } from "@/models/interfaces/User";
import { Note_Backend } from "@/models/interfaces/Note";
import { useGetNewsQuery } from "@/services/apis/newsApi";
import { Article, News } from "@/models/interfaces/News";
import { useTranslation } from "react-i18next";

import { CalendarEvent_Backend } from "@/models/interfaces/CalendarEvent";
import dayjs from "dayjs";

export const HomePage = () => {
  const { t } = useTranslation();
  const { format } = useParseDate();
  const { data: user } = useGetUserQuery();
  const { data: news } = useGetNewsQuery(`"mascotas" OR "mascota"`);
  const {
    vets: vetsData,
    notes: notesData,
    contacts: contactsData,
    events: eventsData,
  } = user as User;

  const tipOfTheDay = useMemo(() => {
    if (news) {
      return news.articles.find(
        (article: Article) =>
          article.summary.includes(
            localStorage.getItem("i18nextLng") === "es" ? "consejo" : "tip"
          ) && article
      );
    }
  }, [news]);

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
      <main className="bg-white shadow-lg rounded-xl p-5">
        <section className="grid grid-cols-3 bg-primary rounded-xl shadow-xl p-5 gap-5">
          <article className="bg-white rounded-xl shadow-xl p-5 relative flex flex-col gap-5">
            <img
              src={`/3d-icons/calendar-alt.png`}
              className="h-[80px] absolute -top-[40px] -right-5 z-20"
            />

            <h3 className="text__primary--gradient">
              {t("HOME.NEXT_APPOINTMENT")}
            </h3>
            {nextAppointmentStart ? (
              <div className="p-5 text-left text-slate-900 bg-white shadow-xl min-h-[300px] min-w-[300px] relative mx-auto">
                <div
                  className={`${
                    eventsData.at(0)?.bgColor
                  } p-2 rounded-full h-[30px] w-[30px] absolute right-5 top-5`}
                ></div>

                <div className="flex items-center gap-5">
                  <h1 className="text-9xl text-slate-500 opacity-50">
                    {dayjs(nextAppointmentStart).format("DD")}
                  </h1>
                  <h1 className="text-6xl text-slate-500 capitalize">
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
          <article className="bg-white rounded-xl shadow-xl p-5 col-span-2 relative">
            <img
              src={`/3d-icons/bulb.png`}
              className="h-[80px] absolute -top-[40px] -right-5 z-20"
            />
            <h3 className="text__primary--gradient">
              {t("HOME.TIP_OF_THE_DAY")}
            </h3>
            <div className="p-5 text-justify">
              {tipOfTheDay && (
                <>
                  <h4 className="leading-loose">{tipOfTheDay.summary}</h4>
                  <a
                    href={tipOfTheDay.link}
                    className="block text-pink-500 font-bold mt-5 hover:underline"
                    target="_blank"
                  >
                    Leer mas
                  </a>
                </>
              )}
            </div>
          </article>
          <article className="bg-white rounded-xl shadow-xl p-5 col-span-2 relative">
            <img
              src={`/3d-icons/thumbtack.png`}
              className="h-[80px] absolute -top-[40px] -right-5 z-20"
            />
            <h3 className="text__primary--gradient">
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
          <article className="bg-white rounded-xl shadow-xl p-5 col-span-1 relative">
            <img
              src={`/3d-icons/news.png`}
              className="h-[80px] absolute -top-[40px] -right-5 z-20"
            />
            <h3 className="text__primary--gradient">{t("HOME.NEWS")}</h3>
            {news ? (
              news.articles
                .slice(0, 3)
                .map(({ title, summary, link }: Article) => {
                  return (
                    <>
                      <strong
                        className="p-2 block text-jus
                      "
                      >
                        {title}
                      </strong>
                      <p className="p-2 text-justify">{summary}</p>
                      <a
                        href={link}
                        className="block text-pink-500 font-bold mb-5 p-2 hover:underline"
                        target="_blank"
                      >
                        Leer mas
                      </a>
                    </>
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
