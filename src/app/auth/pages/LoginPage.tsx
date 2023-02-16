import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AccessCard } from "@/components/AccessCard";
import { Input } from "@/components/Form/Input";
import { Button } from "@/components/Button";
import { AuthNavbar } from "@/app/auth/components/AuthNavbar";

import { useForm } from "@/hooks";

import { getValidationsByQuery } from "@/validators/forms";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AlertMessage } from "@/components/AlertMessage/AlertMessage";
import { onOpenAlertMessage } from "@/store/slices/alertMessageSlice";
import { useLoginMutation } from "@/services/apis";

import { Auth } from "@/models/interfaces/Auth";

export const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    email,
    password,
    onInputChange,
    isFormValid,
    emailValid,
    passwordValid,
  } = useForm(
    {
      email: "",
      password: "",
    },
    getValidationsByQuery(["email", "password"])
  );

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      dispatch(
        onOpenAlertMessage({
          message: t("UI.ALERT_MESSAGE.generic"),
          type: "error",
        })
      );
      setFormSubmitted(true);
      return;
    }
    const { data } = (await login({ email, password })) as Auth;

    localStorage.setItem("id", data.user._id);
    localStorage.setItem("token", data.token);
    location.reload();
    setFormSubmitted(true);
  };

  return (
    <>
      <AuthNavbar>
        <Link to="/join">
          <Button
            title={t("UI.JOIN_LOGIN_RESET.join") as string}
            variant="primary"
          />
        </Link>
      </AuthNavbar>

      <main className="flex flex-col justify-center min-h-screen absolute z-20 w-full">
        <section className="w-auto mx-auto min-w-[500px] max-w-[700px]">
          <AccessCard
            title={t("UI.JOIN_LOGIN_RESET.login") as string}
            variant="secondary"
            onSubmit={onSubmit}
            isValid={email.length > 0 && password.length > 0}
          >
            <div className="flex flex-col gap-5">
              <Input
                placeholder={
                  t("UI.JOIN_LOGIN_RESET.email_placeholder") as string
                }
                name="email"
                label={t("UI.JOIN_LOGIN_RESET.email") as string}
                type={"email"}
                variant="secondary"
                value={email}
                onChange={onInputChange}
                hasError={!!emailValid && formSubmitted}
                errorMessage={t(`${emailValid}`) as string}
              />
              <Input
                placeholder="*********"
                name="password"
                label={t("UI.JOIN_LOGIN_RESET.password") as string}
                type="password"
                variant="secondary"
                value={password}
                onChange={onInputChange}
                hasError={!!passwordValid && formSubmitted}
                errorMessage={t(`${passwordValid}`) as string}
              />

              {/* <Link to="/reset" className="text-right">
                <small className=" font-light underline text-white hover:brightness-200 cursor-pointer">
                  {t("UI.JOIN_LOGIN_RESET.forgot_password") as string}
                </small>
              </Link> */}
            </div>
          </AccessCard>
        </section>
      </main>
      <img
        loading="lazy"
        src="./img/login-bg-alt.png"
        className="absolute z-10 object-right-bottom bottom-0 right-0 h-auto w-auto"
      />
      <div className="absolute top-0 left-0 z-0 h-screen w-screen bg-gradient-to-r from-rose-300 to-rose-100" />
      <AlertMessage />
    </>
  );
};
