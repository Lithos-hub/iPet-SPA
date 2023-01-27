import { Link } from "react-router-dom";

import { AccessCard } from "@/components/AccessCard";
import { Input } from "@/components/Form/Input";
import { Button } from "@/components/Button";
import { AuthNavbar } from "@/app/auth/components/AuthNavbar";

import { useForm } from "@/hooks";

import { getValidationsByQuery } from "@/validators/forms";

import { useTranslation } from "react-i18next";
import { AlertMessage } from "@/components/AlertMessage/AlertMessage";

export const ResetPage = () => {
  const { t } = useTranslation();

  const { formState, email, onInputChange, isFormValid, emailValid } = useForm(
    {
      email: "",
    },
    getValidationsByQuery(["email"])
  );

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <AuthNavbar>
        <div className="flex gap-5">
          <Link to="/join">
            <Button
              title={t("UI.JOIN_LOGIN_RESET.join") as string}
              variant="primary"
            />
          </Link>
          <Link to="/login">
            <Button
              title={t("UI.JOIN_LOGIN_RESET.login") as string}
              variant="secondary"
            />
          </Link>
        </div>
      </AuthNavbar>

      <main className="flex flex-col justify-center min-h-screen absolute z-20 w-full">
        <section className="w-auto mx-auto min-w-[400px] max-w-[700px]">
          <AccessCard
            title={t("UI.JOIN_LOGIN_RESET.reset")}
            variant="tertiary"
            onSubmit={() => onSubmit}
            isValid={isFormValid}
          >
            <div className="flex flex-col gap-5">
              <Input
                placeholder={t("UI.JOIN_LOGIN_RESET.email_placeholder")}
                name="email"
                label={t("UI.JOIN_LOGIN_RESET.email")}
                type="email"
                variant="primary"
                value={email}
                onChange={onInputChange}
                hasError={!!emailValid}
                errorMessage={t(`${emailValid}`) as string}
              />
            </div>
          </AccessCard>
        </section>
      </main>
      <img
        src="./img/reset-bg.png"
        className="absolute z-10 object-right-bottom bottom-0 right-0 h-auto w-auto"
      />
      <AlertMessage />
    </>
  );
};
