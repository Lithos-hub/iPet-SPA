import { FC } from "react";

import { Button } from "@/components/Button";

import { useTranslation } from "react-i18next";

interface Props {
  close: () => void;
  onAccept: React.MouseEventHandler;
  children: JSX.Element;
  subtitle: string;
  open: boolean;
}

export const NotificationModal: FC<Props> = ({
  close,
  onAccept,
  children,
  subtitle,
  open,
}) => {
  const { t } = useTranslation();

  if (open) {
    return (
      <>
        <div
          className="h-screen w-screen fixed z-50 top-0 left-0 opacity-100 backdrop-brightness-75 backdrop-blur"
          onClick={() => close()}
        />
        <div className="h-70vh w-[90vw] max-w-[90vw] md:w-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-xl blurFade p-5 dark:bg-slate-800">
          <h2 className="text__primary--gradient text-center dark:brightness-150">
            {t("UI.MODAL.NOTIFICATION.title")}
          </h2>
          <h4 className="mt-5 text__primary--gradient text-center dark:brightness-150">
            {subtitle}
          </h4>
          <main className="p-5">{children}</main>
          <div className="flex justify-center gap-5">
            <Button
              title={t("UI.MODAL.CRUD.delete") as string}
              type="button"
              variant="danger"
              onClick={onAccept}
            />
          </div>
        </div>
      </>
    );
  }
  return null;
};
