import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";
import { LanguageMenu } from "@/components/LanguageMenu";

export const InitialPage = () => {
  const { t } = useTranslation();

  return (
    <div className="relative text-slate-800">
      <img
        src="img/landing-bg.png"
        className="absolute top-0 left-0 h-auto w-full z-0 object-contain"
      />
      <div className="fixed top-10 right-20 z-20 bg-primary text-white rounded-full shadow-md">
        <LanguageMenu />
      </div>
      <section className="h-screen w-full text-center text-slate-800 relative pb-[400px]">
        <div className="z-20 absolute top-[100px] left-1/2 -translate-x-1/2 text-center  w-auto flex flex-col  gap-10 bg-transparent p-5">
          <div className="flex flex-col gap-10 p-2 rounded-xl">
            <h1 className="text-[100px]">iPet</h1>
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
        {/* <img
          loading="lazy"
          src="./img/landing-header.jpg"
          className="w-full object-cover h-[500px] absolute top-0 left-0"
        /> */}
        {/* <div className="bg-primary h-full w-full fixed z-0 opacity-50" /> */}
        {/* <div className="bg-gradient-to-r from-black h-full w-full fixed z-0 opacity-50" /> */}
      </section>
      <section className="w-full h-screen relative px-[10vw] py-[10vh] bg-transparent pt-[400px]">
        <div className="flex justify-between gap-20 items-center">
          <div className="w-1/2">
            <h1 className="text-7xl text__primary--gradient">
              {t("LANDING.title_1")}
            </h1>
            <p className="text-lg font-light mt-5 ">
              {t("LANDING.subtitle_1")}
            </p>
          </div>
          <div className="w-1/2">Image</div>
        </div>
      </section>
      <section className="w-full h-screen relative px-[10vw] py-[10vh] bg-transparent pt-[400px] text-right">
        <div className="flex justify-between gap-20 items-center">
          <div className="w-1/2">Image</div>
          <div className="w-1/2">
            <h1 className="text-7xl text__primary--gradient">
              {" "}
              {t("LANDING.title_2")}
            </h1>
            <p className="text-lg font-light mt-5 ">
              {t("LANDING.subtitle_2")}
            </p>
          </div>
        </div>
      </section>
      <section className="w-full h-screen relative px-[10vw] py-[10vh] bg-transparent pt-[400px]">
        <div className="flex justify-between gap-20 items-center">
          <div className="w-1/2">
            <h1 className="text-7xl text__primary--gradient">
              {t("LANDING.title_3")}
            </h1>
            <p className="text-lg font-light mt-5 ">
              {t("LANDING.subtitle_3")}
            </p>
          </div>
          <div className="w-1/2">Image</div>
        </div>
      </section>
      <section className="w-full h-screen relative px-[10vw] py-[10vh] bg-transparent pt-[400px] text-right">
        <div className="flex justify-between gap-20 items-center">
          <div className="w-1/2">Image</div>
          <div className="w-1/2">
            <h1 className="text-7xl text__primary--gradient">
              {" "}
              {t("LANDING.title_4")}
            </h1>
            <p className="text-lg font-light mt-5 ">
              {t("LANDING.subtitle_4")}
            </p>
          </div>
        </div>
      </section>
      <section className="w-full h-screen relative px-[10vw] py-[10vh] bg-transparent">
        <div className="text-center">
          <div className="w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-20 items-center">
            <h1 className="text-7xl text__primary--gradient">
              {t("LANDING.final")}
            </h1>
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
