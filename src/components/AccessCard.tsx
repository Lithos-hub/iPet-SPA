import { useRef, RefObject } from "react";
import { Button } from "./Button";
import { ButtonVariant } from "../types/ButtonVariant";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  variant?: ButtonVariant;
  onSubmit: Function;
  children: any;
  isValid: boolean;
}

export const AccessCard = ({
  title,
  variant = "primary",
  onSubmit,
  children,
  isValid,
}: Props) => {
  const { t } = useTranslation();

  const form: RefObject<HTMLFormElement> = useRef(null);
  return (
    <div className="bg-[#202020] rounded-xl shadow-lg w-full">
      <header
        className={`p-5 text-white ${
          (variant === "primary" && "bg-primary") ||
          (variant === "secondary" && "bg-secondary") ||
          (variant === "tertiary" && "bg-tertiary")
        } rounded-t-xl`}
      >
        <h3 className="text-center">{title}</h3>
      </header>
      <form ref={form} onSubmit={(e) => onSubmit(e)}>
        <main className="p-5">{children}</main>
        <footer className="p-5 text-center">
          <Button
            title={t("UI.JOIN_LOGIN_RESET.submit") as string}
            type="submit"
            disabled={!isValid}
            variant={isValid ? variant : "disabled"}
            onClick={() =>
              new SubmitEvent("submit", { submitter: form.current })
            }
          />
        </footer>
      </form>
    </div>
  );
};
