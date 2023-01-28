import React, { RefObject, useEffect, useRef, useState } from "react";

import { Formik } from "formik";
import { TableInput } from "./TableInput";
import { Button } from "@/components/Button";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { InputsRow } from "@/models/interfaces/InputsRow";

import {
  useDeleteContactMutation,
  useDeleteNoteMutation,
  useDeleteVetMutation,
  useGetUserQuery,
  useUpdateContactMutation,
  useUpdateNoteMutation,
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
  const [updateNote] = useUpdateNoteMutation();

  const [deleteVet] = useDeleteVetMutation();
  const [deleteContact] = useDeleteContactMutation();
  const [deleteNote] = useDeleteNoteMutation();

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
    } else if (category === "notes") {
      console.log(data);
      if (data.description) {
        await updateNote(data);
      } else {
        await deleteNote(data.id);
      }
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
          {category !== "notes" ? (
            <div className={`flex flex-grow gap-5 text-center items-center`}>
              {category !== "notes" && (
                <div className="relative flex flex-col justify-center bg-primary text-white min-w-[50px] min-h-[50px] rounded-full">
                  <h3 className="p-2">{rowIndex}</h3>
                </div>
              )}
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
          ) : (
            defineCol.map(({ field }, index: number) => (
              <div key={index} className="post-it__wrapper">
                <div className="post-it relative bg-gradient-to-br from-[#FEFF9C] to-[#FFF740] text-black w-full min-h-[300px] p-5 shadow-lg shadow-[#505050]">
                  <img
                    src="/3d-icons/thumbtack-variant.png"
                    className="h-[60px] absolute top-2 right-2"
                  />
                  <textarea
                    {...getFieldProps(field)}
                    className="text-left w-11/12 min-h-[300px] resize-none border-none p-5 pr-[50px] duration-200 bg-transparent focus:bg-white focus:bg-opacity-50 focus:outline-none"
                    value={values[field]}
                    onBlur={onSave}
                    name={field}
                  />
                </div>
              </div>
            ))
          )}
        </form>
      )}
    </Formik>
  );
};
