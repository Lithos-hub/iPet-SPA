import React, { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";

import { PetRowData } from "./PetRowData";

import { useTimeConverter } from "@/hooks/useTimeConverter";
import { useImage } from "@/hooks/useImage";

import { Pet_Actions } from "@/models/interfaces/Pet";

import { useTranslation } from "react-i18next";

export const PetRowItem = ({ ...props }: Pet_Actions) => {
  const { t } = useTranslation();
  const { i } = useImage();

  const getAge = (birthday: number) => {
    const today = new Date();
    return useTimeConverter(birthday, today);
  };

  return (
    <div className="flex justify-between items-center bg-primary gap-10 shadow-lg rounded-xl p-5 text-white relative">
      {props.imageUrl && (
        <img
          src={`${i(props.imageUrl)}`}
          alt="pet avatar"
          className="w-auto min-w-[300px] h-full aspect-video object-cover rounded-l-xl absolute top-0 left-0 z-0 img-to-transparent"
        />
      )}

      <h2 className="text-4xl z-20 ml-auto pr-5">{props.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-end gap-5">
        <PetRowData
          title={t("PETS.specie")}
          data={`${t(`PETS.${props.specie}`)}`}
          icon={props.specie}
        />
        <PetRowData title={t("PETS.breed")} data={props.breed} icon="breed" />
        <PetRowData
          title={t("PETS.sex")}
          data={`${t(`PETS.${props.sex}`)}`}
          icon="gender"
        />
        <PetRowData
          title={t("PETS.weight")}
          data={
            t(`PETS.${props.weight_measure}`, {
              count: Number(props.weight),
            }) as string
          }
          icon="weight"
        />
        <PetRowData
          title={t("PETS.age")}
          data={getAge(props.birthday)}
          icon="calendar"
        />
      </div>

      <div className="z-20 flex justify-end gap-5 self-center">
        <div className="flex flex-col text-center items-center">
          <Button
            variant="icon"
            icon={<LaunchIcon />}
            onClick={() => props.onSeeDetails(props.id)}
          />
          <small>{t("PETS.action_details")}</small>
        </div>
        <div className="flex flex-col text-center items-center">
          <Button
            variant="icon"
            icon={<EditIcon />}
            onClick={() => props.onEdit(props.id)}
          />
          <small>{t("PETS.action_edit")}</small>
        </div>
        <div className="flex flex-col text-center items-center">
          <Button
            variant="icon"
            icon={<DeleteIcon />}
            onClick={() => props.onDelete(props.id)}
          />
          <small>{t("PETS.action_delete")}</small>
        </div>
      </div>
    </div>
  );
};
