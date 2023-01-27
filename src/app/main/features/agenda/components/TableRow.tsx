import React, { RefObject, useEffect, useRef, useState } from "react";

import { Formik } from "formik";
import { TableInput } from "./TableInput";
import { Button } from "@/components/Button";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { InputsRow } from "@/models/interfaces/InputsRow";

import {
  useDeleteContactMutation,
  useDeleteVetMutation,
  useGetUserQuery,
  useUpdateContactMutation,
  useUpdateVetMutation,
} from "@/services/apis";

interface Props {
  data: any;
  defineCol: InputsRow[];
  category: string;
  rowIndex: number;
}

export const TableRow = ({ data, category, defineCol, rowIndex }: Props) => {
  const { refetch } = useGetUserQuery();

  const [updateVet] = useUpdateVetMutation();
  const [updateContact] = useUpdateContactMutation();

  const [deleteVet] = useDeleteVetMutation();
  const [deleteContact] = useDeleteContactMutation();

  const formRef: RefObject<HTMLFormElement> = useRef(null);

  const onSave = () => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  const onSubmit = async (data: any) => {
    if (category === "vets") {
      await updateVet(data);
      refetch();
    } else if (category === "contacts") {
      await updateContact(data);
      refetch();
    }
  };

  const onDelete = async () => {
    if (category === "vets") {
      await deleteVet(data.id);
      refetch();
    }
    if (category === "contacts") {
      await deleteContact(data.id);
      refetch();
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={data}
      onSubmit={async (values) => await onSubmit(values)}
    >
      {({ values, handleSubmit, getFieldProps }) => (
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className={`flex flex-grow gap-5 text-center items-center`}>
            <div className="relative flex flex-col justify-center bg-primary text-white min-w-[50px] min-h-[50px] rounded-full">
              <h3 className="p-2">{rowIndex}</h3>
            </div>
            {defineCol.map(({ field, type }, index: number) => (
              <div key={index} className="flex-1">
                <TableInput
                  {...getFieldProps(field)}
                  key={index}
                  name={field}
                  placeholder={field}
                  value={values[field]}
                  type={type}
                  category={category}
                  onBlur={onSave}
                />
              </div>
            ))}
            <div className="relative flex flex-col justify-center items-center shadow-md text-red-500 min-w-[50px] min-h-[50px] rounded-full hover:bg-red-500 hover:text-white duration-200">
              <Button
                variant="icon"
                type="button"
                icon={<DeleteIcon color="inherit" />}
                onClick={onDelete as React.MouseEventHandler}
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
