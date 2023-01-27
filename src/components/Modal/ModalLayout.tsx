import { Button } from "@/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import { useTranslation } from "react-i18next";
import { useUIStore } from "@/hooks";

type Props = {
  title: string;
  children: JSX.Element;
  onAccept: React.MouseEventHandler;
  disabled?: boolean;
};

export const ModalLayout = ({ title, children, onAccept, disabled }: Props) => {
  const { t } = useTranslation();
  const { showFormModal } = useSelector((state: RootState) => state.modalStore);
  const { setCloseModals } = useUIStore();

  return (
    <>
      {showFormModal && (
        <>
          <div
            className="h-screen w-screen fixed z-50 top-0 left-0 opacity-100 backdrop-brightness-75 backdrop-blur duration-500"
            onClick={setCloseModals}
          />
          {/* MODAL */}
          <div className="h-70vh w-[90vw] md:w-[75vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-xl blurFade">
            <header className="p-5 text-white bg-primary rounded-t-xl">
              <h3 className="text-center">{title}</h3>
            </header>

            <main className="p-5">{children}</main>
            <footer className="p-5 flex flex-col md:flex-row justify-end  gap-5">
              <Button
                title={t("UI.MODAL.close") as string}
                type="button"
                variant="tertiary"
                onClick={setCloseModals}
              />
              <Button
                title={t("UI.MODAL.accept") as string}
                type="submit"
                variant={disabled ? "disabled" : "primary"}
                disabled={disabled}
                onClick={onAccept}
              />
            </footer>
          </div>
        </>
      )}
    </>
  );
};
