import React from "react";

import Menu from "@mui/material/Menu/Menu";
import TranslateIcon from "@mui/icons-material/Translate";

import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { Button } from "./Button";
import { MenuItem } from "@mui/material";

export const LanguageMenu = () => {
  const { t } = useTranslation();

  const [languageState, setLanguageState] = React.useState<null | HTMLElement>(
    null
  );

  const isShowingLanguages = Boolean(languageState);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguageState(event.currentTarget);
  };
  const handleClose = () => {
    setLanguageState(null);
  };
  const setLanguage = (lang: "es" | "en") => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <>
      {isShowingLanguages && (
        <div
          className="fixed top-0 left-0 h-screen w-screen"
          onClick={() => setLanguageState(null)}
        ></div>
      )}
      <div className="relative">
        <Button
          icon={<TranslateIcon />}
          variant="icon_transparent"
          onClick={handleClick}
        />
        {isShowingLanguages && (
          <div className="absolute left-1/2 -translate-x-1/2 w-auto">
            <div className="bg-white rounded-md shadow-xl text-center text-black relative">
              <ul>
                <li
                  onClick={() => setLanguage("es")}
                  className="flex justify-center p-5 px-10 cursor-pointer hover:bg-slate-100"
                >
                  <img src="/svg/es.svg" className="h-[20px] mr-5" />
                  <span>{t("UI.LANG.es")}</span>
                </li>
                <li
                  onClick={() => setLanguage("en")}
                  className="flex justify-center p-5 px-10 cursor-pointer hover:bg-slate-100"
                >
                  <img src="/svg/en.svg" className="h-[20px] mr-5" />
                  <span>{t("UI.LANG.en")}</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* <Menu
          anchorEl={languageState}
          open={isShowingLanguages}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => setLanguage("es")}>
            <img src="/svg/es.svg" className="h-[20px] mr-5" />
            <span>{t("UI.LANG.es")}</span>
          </MenuItem>
          <MenuItem onClick={() => setLanguage("en")}>
            <img src="/svg/en.svg" className="h-[20px] mr-5" />
            <span>{t("UI.LANG.en")}</span>
          </MenuItem>
        </Menu> */}
      </div>
    </>
  );
};
