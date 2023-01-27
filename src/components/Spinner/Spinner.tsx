import { useTranslation } from "react-i18next";

export const Loader = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="h-screen w-screen fixed z-50 top-0 left-0 opacity-100 backdrop-brightness-75 backdrop-blur duration-500" />
      <div className="z-50 h-screen w-screen fixed flex justify-center items-center">
        <div className="flex flex-col">
          <div className="lds-grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-pink-900">{t("UI.SPINNER.loading")}</p>
        </div>
      </div>
    </>
  );
};
