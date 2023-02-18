import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import { Form, Formik } from "formik";

import { useGetUserQuery, useUpdateUserMutation } from "@/services/apis";

import { Input } from "@/components/Form/Input";

import { toggleMode } from "@/utils/DarkModeToggle";
import { User } from "@/models/interfaces/User";
import { useAlertMessageStore } from "@/hooks";

import * as Yup from "yup";

export const SettingsPage = () => {
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery<{ data: User }>();
  const [updateUser] = useUpdateUserMutation();
  const [accountInitialValues] = useState<{
    email: string | undefined;
    password: string;
  }>({
    email: user.email,
    password: "",
  });
  const { showSnackbar } = useAlertMessageStore();

  let debounce: TimeoutId;

  const onFormChange = (values: Record<string, string>) => {
    clearTimeout(debounce);

    debounce = setTimeout(() => {
      try {
        updateUser({
          ...values,
        }).unwrap();
        showSnackbar({
          message: t("UI.ALERT_MESSAGE.SUCCESS.user_update"),
          type: "success",
        });
      } catch (err: any) {
        showSnackbar({
          message: t("UI.ALERT_MESSAGE.ERROR.user_update"),
          type: "error",
        });
      }
    }, 1000);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  return (
    <>
      <header className="flex justify-between items-center mb-5 ">
        <h2 className="text__primary--gradient dark:brightness-150">
          {t("USER.title")}
        </h2>
      </header>
      <main className="bg-white shadow-lg rounded-xl p-5 dark:bg-slate-700">
        <h3 className="font-bold dark:text-white">{t("USER.account")}</h3>
        <hr className="my-2 mb-10" />
        <Formik
          initialValues={accountInitialValues}
          onSubmit={() => {}}
          validationSchema={validationSchema}
        >
          {({ values, errors, handleChange, getFieldProps }) => (
            <Form className="grid grid-cols-2 gap-5 mb-10">
              <Input
                {...getFieldProps(values.email)}
                label={t("USER.email")}
                placeholder={t("USER.email_placeholder") as string}
                type="email"
                name="email"
                value={values.email}
                hasError={!!errors.email}
                errorMessage={t(`${errors.email}`) as string}
                onChange={(e: any) => {
                  handleChange(e);
                  if (
                    validationSchema.validateSync({ email: e.target.value })
                  ) {
                    onFormChange({ email: e.target.value });
                  }
                }}
              />
              <Input
                {...getFieldProps(values.password)}
                label={t("USER.password")}
                placeholder={t("USER.password_placeholder") as string}
                type="password"
                name="password"
                value={values.password}
                hasError={!!errors.password}
                errorMessage={t(`${errors.password}`) as string}
                onChange={(e: any) => {
                  handleChange(e);
                  if (
                    validationSchema.validateSync({ password: e.target.value })
                  ) {
                    onFormChange({ password: e.target.value });
                  }
                }}
              />
            </Form>
          )}
        </Formik>
        <h3 className="font-bold dark:text-white">{t("USER.appearance")}</h3>
        <hr className="my-2 mb-10" />
        <div className="flex justify-center gap-10">
          {/* DARK MODE */}
          <div
            className="w-[350px] duration-200 cursor-pointer hover:scale-105 hover:brightness-125 border rounded-xl shadow-xl dark:border-none"
            onClick={() => {
              localStorage.theme = "dark";
              toggleMode();
            }}
          >
            <header className="bg-primary p-5 flex justify-end gap-5 rounded-t-xl">
              <div className="w-[35px] p-1 bg-white rounded-xl" />
              <div className="w-[35px] p-1 bg-white rounded-xl" />
              <div className="w-[35px] p-1 bg-white rounded-xl" />
            </header>
            <main className="bg-slate-900 p-10">
              <div className="flex gap-5">
                <div className="bg-primary h-[100px] w-full p-2 rounded-xl shadow-xl" />
                <div className="flex flex-col gap-2">
                  <div className="w-[150px] p-1 bg-gray-200 rounded-xl" />
                  <div className="w-[70px] mr-auto h-[3px] bg-gray-200 rounded-xl" />
                  <div className="w-[100px] mr-auto h-[3px] bg-gray-200 rounded-xl" />
                  <div className="w-[120px] mr-auto h-[3px] bg-gray-200 rounded-xl" />
                  <div className="w-[100px] mr-auto h-[3px] bg-gray-200 rounded-xl" />
                  <div className="w-[100px] mr-auto h-[3px] bg-gray-200 rounded-xl" />
                  <div className="w-[130px] mr-auto h-[3px] bg-gray-200 rounded-xl" />
                  <div className="w-[70px] mr-auto h-[3px] bg-gray-200 rounded-xl" />
                  <div className="w-[120px] mr-auto h-[3px] bg-gray-200 rounded-xl" />
                </div>
              </div>
            </main>
            <footer className="bg-[#101010] text-white font-bold p-5 rounded-b-xl">
              <div>{t("USER.dark_mode")}</div>
            </footer>
          </div>
          {/* LIGHT MODE */}
          <div
            className="w-[350px] duration-200 cursor-pointer hover:scale-105 hover:brightness-125 border rounded-xl shadow-xl dark:border-none"
            onClick={() => {
              localStorage.theme = "light";
              toggleMode();
            }}
          >
            <header className="bg-primary p-5 flex justify-end gap-5 rounded-t-xl">
              <div className="w-[35px] p-1 bg-white rounded-xl" />
              <div className="w-[35px] p-1 bg-white rounded-xl" />
              <div className="w-[35px] p-1 bg-white rounded-xl" />
            </header>
            <main className="bg-white p-10">
              <div className="flex gap-5">
                <div className="bg-primary h-[100px] w-full p-2 rounded-xl shadow-xl" />
                <div className="flex flex-col gap-2">
                  <div className="w-[150px] p-1 bg-slate-900 rounded-xl" />
                  <div className="w-[70px] mr-auto h-[3px] bg-slate-900 rounded-xl" />
                  <div className="w-[100px] mr-auto h-[3px] bg-slate-900 rounded-xl" />
                  <div className="w-[120px] mr-auto h-[3px] bg-slate-900 rounded-xl" />
                  <div className="w-[100px] mr-auto h-[3px] bg-slate-900 rounded-xl" />
                  <div className="w-[100px] mr-auto h-[3px] bg-slate-900 rounded-xl" />
                  <div className="w-[130px] mr-auto h-[3px] bg-slate-900 rounded-xl" />
                  <div className="w-[70px] mr-auto h-[3px] bg-slate-900 rounded-xl" />
                  <div className="w-[120px] mr-auto h-[3px] bg-slate-900 rounded-xl" />
                </div>
              </div>
            </main>
            <footer className="bg-[#101010] text-white font-bold p-5 rounded-b-xl">
              <div>{t("USER.light_mode")}</div>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
};
