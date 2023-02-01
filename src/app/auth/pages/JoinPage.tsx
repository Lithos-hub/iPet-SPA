import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AccessCard } from "@/components/AccessCard";
import { Button } from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { AuthNavbar } from "@/app/auth/components/AuthNavbar";

import { useForm } from "@/hooks";

import { getValidationsByQuery } from "@/validators/forms";

import { useTranslation } from "react-i18next";

import { AlertMessage } from "@/components/AlertMessage/AlertMessage";
import { useDispatch } from "react-redux";
import { useJoinMutation } from "@/services/apis";

import { onOpenAlertMessage } from "@/store/slices/alertMessageSlice";
import { Auth } from "@/models/interfaces/Auth";

export const JoinPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [join, { error, isLoading }] = useJoinMutation();

  const {
    email,
    password,
    rep_password,
    onInputChange,
    isFormValid,
    emailValid,
    passwordValid,
  } = useForm(
    {
      email: "",
      password: "",
      rep_password: "",
    },
    getValidationsByQuery(["email", "password"])
  );

  const [matchPassState, setMatchPassState] = useState(false);

  useEffect(() => {
    setMatchPassState(password === rep_password);
  }, [password, rep_password]);

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
    try {
      const { data } = (await join({ email, password })) as Auth;

      localStorage.setItem("id", data.user._id);
      localStorage.setItem("token", data.token);
      location.reload();
    } catch (error: any) {
      dispatch(
        onOpenAlertMessage({
          message: t(`UI.ALERT_MESSAGE.${error.data.error}`),
          type: "error",
        })
      );
    } finally {
      setFormSubmitted(true);
    }
  };

  return (
    <>
      <AuthNavbar>
        <Link to="/login">
          <Button
            title={t("UI.JOIN_LOGIN_RESET.login") as string}
            variant="secondary"
          />
        </Link>
      </AuthNavbar>
      <main className="flex flex-col justify-center min-h-screen absolute z-20 w-full ">
        <section className="w-auto mx-auto min-w-[500px] max-w-[700px]">
          <AccessCard
            title={t("UI.JOIN_LOGIN_RESET.join")}
            onSubmit={onSubmit}
            isValid={
              email.length > 0 && password.length > 0 && rep_password.length > 0
            }
          >
            <div className="flex flex-col gap-5">
              <Input
                placeholder={
                  t("UI.JOIN_LOGIN_RESET.email_placeholder") as string
                }
                name="email"
                label={t("UI.JOIN_LOGIN_RESET.email")}
                type="email"
                variant="primary"
                value={email}
                onChange={onInputChange}
                hasError={!!emailValid && formSubmitted}
                errorMessage={t(`${emailValid}`) as string}
              />
              <Input
                placeholder="*********"
                name="password"
                label={t("UI.JOIN_LOGIN_RESET.password")}
                type="password"
                variant="primary"
                value={password}
                onChange={onInputChange}
                hasError={!!passwordValid && formSubmitted}
                errorMessage={t(`${passwordValid}`) as string}
              />
              <Input
                placeholder="*********"
                name="rep_password"
                label={t("UI.JOIN_LOGIN_RESET.rep_password")}
                type="password"
                variant="primary"
                value={rep_password}
                onChange={onInputChange}
                hasError={!matchPassState && formSubmitted}
                errorMessage={t("UI.ERRORS.pass_match") as string}
              />
            </div>
          </AccessCard>
        </section>
      </main>
      <img
        loading="lazy"
        src="./img/join-bg.png"
        className="absolute z-10 object-contain bottom-0 right-0 h-auto w-auto"
      />
      <div className="absolute top-0 left-0 z-0 h-screen w-screen bg-[#FEDC00]" />
      <AlertMessage />
    </>
  );
};
