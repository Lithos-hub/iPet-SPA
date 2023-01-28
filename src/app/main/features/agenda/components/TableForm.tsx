import React, { RefObject, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Formik } from "formik";
import { TableInput } from "./TableInput";
import { Button } from "@/components/Button";

import { InputsRow } from "@/models/interfaces/InputsRow";

import {
  useCreateContactMutation,
  useCreateNoteMutation,
  useCreateVetMutation,
  useGetUserQuery,
} from "@/services/apis";

import { useAlertMessageStore } from "@/hooks";
import { TableTextarea } from "./TableTextarea";

import AddIcon from "@mui/icons-material/Add";

interface Props {
  defineCol: InputsRow[];
  category: string;
  textarea?: boolean;
}

export const TableForm = ({ defineCol, category, textarea }: Props) => {
  const { t } = useTranslation();
  const { refetch } = useGetUserQuery();
  const { showSnackbar } = useAlertMessageStore();

  const [createVet] = useCreateVetMutation();
  const [createContact] = useCreateContactMutation();
  const [createNote] = useCreateNoteMutation();

  const formRef: RefObject<HTMLFormElement> = useRef(null);

  const onSave = () => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  const onSubmit = (data: any) => {
    if (category === "vets") {
      createVet(data)
        .unwrap()
        .then(() => refetch())
        .catch(({ data }) => {
          showSnackbar({
            message: data.errors.map(({ msg }: { msg: string }) => `${msg}. `),
            type: "error",
          });
        });
    } else if (category === "contacts") {
      createContact(data)
        .unwrap()
        .then(() => refetch())
        .catch(({ data }) => {
          showSnackbar({
            message: data.errors.map(({ msg }: { msg: string }) => `${msg}. `),
            type: "error",
          });
        });
    }
    if (category === "notes") {
      createNote(data)
        .unwrap()
        .then(() => refetch())
        .catch(({ data }) => {
          showSnackbar({
            message: data.errors.map(({ msg }: { msg: string }) => `${msg}. `),
            type: "error",
          });
        });
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{}}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit(values);
          resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit, getFieldProps }) => (
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className={`flex gap-5 text-center items-end`}>
              {defineCol.map(({ field, type }, index: number) => (
                <div key={index} className="flex-grow">
                  <div
                    key={index}
                    className="flex-grow font-medium my-2 text__primary--gradient"
                  >
                    {t(`AGENDA.${category.toUpperCase()}.${field}`)}
                  </div>
                  {textarea ? (
                    <TableTextarea
                      {...getFieldProps(field)}
                      key={index + 1}
                      name={field}
                      placeholder={`${field}`}
                      value={values[field as keyof typeof values] || ""}
                      category={category}
                      onChange={handleChange}
                    />
                  ) : (
                    <TableInput
                      {...getFieldProps(field)}
                      key={index + 1}
                      name={field}
                      placeholder={`${field}`}
                      value={values[field as keyof typeof values] || ""}
                      type={type}
                      category={category}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
              <div className="max-w-[40px] mb-3">
                {/* <Button
                  variant="primary"
                  type="button"
                  onClick={onSave as React.MouseEventHandler}
                  title={t("AGENDA.save") as string}
                /> */}
                <div className="">
                  <Button
                    icon={<AddIcon />}
                    className="h-[40px] w-[40px] text-white bg-primary rounded-full shadow-lg"
                    onClick={onSave as React.MouseEventHandler}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
