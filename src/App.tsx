import { AppRouter } from "./app/router/AppRouter";

import { useEffect } from "react";
import dayjs from "dayjs";
import ReloadPrompt from "./ReloadPrompt";

export const App = () => {
  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "es";
    dayjs.locale(lang);
  }, []);

  return (
    <>
      <ReloadPrompt />
      <AppRouter />
    </>
  );
};
