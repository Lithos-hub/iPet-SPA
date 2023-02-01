import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";
import { LanguageMenu } from "@/components/LanguageMenu";

export const InitialPage = () => {
  const { t } = useTranslation();

  return (
    <div className="relative text-slate-800">
      <img
        src="./svg/landing-0.svg"
        className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-auto h-screen object-contain"
      />
      <div className="fixed top-10 right-20 z-20 bg-primary text-white rounded-full shadow-md">
        <LanguageMenu />
      </div>
      <section className="h-screen w-full text-center text-slate-800 relative pb-[400px]">
        <div className="z-20 absolute top-[100px] left-1/2 -translate-x-1/2 text-center w-auto flex flex-col gap-10 p-5">
          <div className="flex flex-col gap-10 p-2">
            <h1 className="text-[120px] text-pink-500">iPet</h1>
            <h5 className="w-[700px] mx-auto text-center bg-white p-2 rounded-xl shadow-xl">
              {t("LANDING.subtitle")}
            </h5>
          </div>
          <div className="flex flex-col gap-5 mx-auto text-center">
            <Link to="join">
              <Button
                title={t("LANDING.get_started") as string}
                variant="primary"
              />
            </Link>
            <Link to="login" className="text-center">
              <small className="text-center underline">
                {t("LANDING.have_account")}
              </small>
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full h-screen relative px-[10vw] py-[10vh] bg-transparent pt-[400px] flex items-center">
        <div className="w-1/2">
          <h1 className="text-7xl text__primary--gradient">
            {t("LANDING.title_1")}
          </h1>
          <p className="text-lg font-light mt-5 ">{t("LANDING.subtitle_1")}</p>
        </div>
        <div className="w-1/2">
          <img loading="lazy" src="./svg/landing-1.svg" />
        </div>
      </section>
      <section className="w-full h-screen relative px-[10vw] py-[10vh] bg-transparent pt-[400px] flex items-center">
        <div className="w-1/2">
          <img loading="lazy" src="./svg/landing-2.svg" />
        </div>
        <div className="w-1/2">
          <h1 className="text-7xl text__primary--gradient">
            {t("LANDING.title_2")}
          </h1>
          <p className="text-lg font-light mt-5 ">{t("LANDING.subtitle_2")}</p>
        </div>
      </section>
      <section className="w-full h-screen relative px-[10vw] py-[10vh] bg-transparent pt-[400px] flex items-center">
        <div className="w-1/2">
          <img loading="lazy" src="./svg/landing-3.svg" />
        </div>
        <div className="w-1/2">
          <h1 className="text-7xl text__primary--gradient">
            {t("LANDING.title_3")}
          </h1>
          <p className="text-lg font-light mt-5 ">{t("LANDING.subtitle_3")}</p>
        </div>
      </section>
      <section className="w-full h-screen relative px-[10vw] py-[10vh] bg-transparent pt-[400px] flex items-center">
        <div className="w-1/2">
          <h1 className="text-7xl text__primary--gradient">
            {t("LANDING.title_4")}
          </h1>
          <p className="text-lg font-light mt-5 ">{t("LANDING.subtitle_4")}</p>
        </div>
        <div className="w-1/2">
          <img loading="lazy" src="./svg/landing-4.svg" />
        </div>
      </section>
      <section className="w-full h-screen relative px-[10vw] py-[10vh] bg-transparent">
        <div className="text-center">
          <div className="w-1/2 absolute bottom-[220px] left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-20 items-center">
            <h1 className="text-5xl text__primary--gradient">
              {t("LANDING.final")}
            </h1>
          </div>
        </div>
        <div className="w-1/2 mx-auto text-center">
          <img
            loading="lazy"
            src="./svg/landing-5.svg"
            className="w-3/4 m-auto"
          />
          <div className="mt-[100px]">
            <Link to="join">
              <Button
                title={t("LANDING.get_started") as string}
                variant="primary"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
