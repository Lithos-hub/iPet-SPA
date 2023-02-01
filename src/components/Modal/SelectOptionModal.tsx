import { FC } from "react";

import { Button } from "@/components/Button";

import { useTranslation } from "react-i18next";

interface Props {
  close: () => void;
  children: JSX.Element;
  open: boolean;
}

export const SelectOptionModal: FC<Props> = ({ close, children, open }) => {
  const { t } = useTranslation();

  if (open) {
    return (
      <>
        <div
          className="h-screen w-screen fixed z-50 top-0 left-0 opacity-100 backdrop-brightness-75 backdrop-blur"
          onClick={() => close()}
        />
        <div className="h-70vh w-[90vw] max-w-[90vw] md:w-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-xl blurFade p-5">
          <div className="flex flex-col gap-5">
            <h4 className="text__primary--gradient text-center">
              {t("UI.MODAL.SELECT_OPTION.title")}
            </h4>
            {children}
          </div>
        </div>
      </>
    );
  }
  return null;
};
