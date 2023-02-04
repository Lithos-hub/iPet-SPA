import { FC, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";
import { LanguageMenu } from "@/components/LanguageMenu";

import { motion } from "framer-motion";

import { LandingSection } from "../components/LandingSection/LandingSection";
import { LandingSectionProps } from "../components/LandingSection/models";

export const InitialPage: FC = () => {
  const { t } = useTranslation();

  const ref = useRef(null);

  const sections: LandingSectionProps[] = useMemo(() => {
    return [
      {
        title: t("LANDING.title_1"),
        direction: "right",
        subtitle: t("LANDING.subtitle_1"),
        image: "landing-1",
      },
      {
        title: t("LANDING.title_2"),
        direction: "left",
        subtitle: t("LANDING.subtitle_2"),
        image: "landing-2",
      },
      {
        title: t("LANDING.title_3"),
        direction: "right",
        subtitle: t("LANDING.subtitle_3"),
        image: "landing-3",
      },
      {
        title: t("LANDING.title_4"),
        direction: "left",
        subtitle: t("LANDING.subtitle_4"),
        image: "landing-4",
      },
    ];
  }, [t]);

  return (
    <div ref={ref} className="relative text-slate-800 overflow-hidden">
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
      {sections.map(({ title, subtitle, direction, image }, index) => {
        return (
          <div key={index}>
            <LandingSection
              direction={direction}
              title={title}
              subtitle={subtitle}
              image={image}
            />
          </div>
        );
      })}
      <section className="w-full h-screen relative px-[10vw] pt-[20vh] flex flex-col gap-5">
        <div className="text-center">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.5,
              }}
            >
              <h1 className="text-5xl text__primary--gradient">
                {t("LANDING.final")}
              </h1>
            </motion.div>
          </div>
        </div>
        <div className="w-1/2 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <img
              loading="lazy"
              src="./svg/landing-5.svg"
              className="w-3/4 m-auto"
            />
          </motion.div>

          <Link to="join">
            <Button
              title={t("LANDING.get_started") as string}
              variant="primary"
            />
          </Link>
        </div>
      </section>
    </div>
  );
};
