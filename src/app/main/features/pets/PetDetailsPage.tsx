import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

import { useTranslation } from "react-i18next";

import { useTimeConverter } from "@/hooks/useTimeConverter";
import dayjs from "dayjs";

import { PetRowData } from "./components/PetRowData";
import { NoDataMessage } from "@/components/NoDataMessage";

import { Pet_Backend } from "@/models/interfaces/Pet";
import { User } from "@/models/interfaces/User";
import { useImage } from "@/hooks/useImage";

export const PetDetailsPage = () => {
  const { t } = useTranslation();
  const { i } = useImage();

  const params = useParams();

  const {
    user: { pets },
  } = useSelector((state: RootState) => state.userStore) as { user: User };

  const data = useMemo(() => {
    return pets.find((pet) => pet.id.toString() === params.id) as Pet_Backend;
  }, [pets]);

  const AgeDisplay = ({ birthday }: { birthday: number }) => {
    const today = new Date();
    return (
      <>
        <span>{useTimeConverter(birthday, today)}</span>
      </>
    );
  };

  const CreatedAtDisplay = ({ createdAt }: { createdAt: string }) => {
    const newDate = new Date(createdAt);
    const dayjsDate = dayjs(newDate).format("DD MMM YYYY");
    return (
      <>
        <span>{dayjsDate}</span>
      </>
    );
  };

  return (
    <>
      {data ? (
        <>
          <header className="flex justify-between items-center mb-5 bg-white py-5 px-5 rounded-xl shadow-lg dark:bg-slate-700">
            <h1 className="text__primary--gradient dark:brightness-150">
              {t("PET_DETAILS.title")}
            </h1>
            <h1
              className={`ml-5 font-bold text-white rounded-xl p-2 px-5 ${
                data.sex === "male" ? "bg-blue-500" : "bg-pink-500"
              }`}
            >
              {data.name}
            </h1>
          </header>
          <main className="grid grid-cols-12 gap-5">
            <div className="col-span-5 rounded-xl p-5 bg-white w-auto h-auto shadow-lg dark:bg-slate-700">
              <img
                src={i(`${data.imageUrl}`)}
                className="aspect-square object-cover w-auto rounded-xl shadow-lg"
              />
            </div>
            <section className="col-span-7 bg-white w-full shadow-lg rounded-xl p-5 grid lg:grid-cols-2 gap-5 text-center items-center dark:bg-slate-700">
              <PetRowData
                title={t("PETS.weight")}
                data={
                  t(`PETS.${data.weight_measure}`, {
                    count: data.weight,
                  }) as string
                }
                icon="weight"
              />
              <PetRowData
                title={t("PETS.createdAt")}
                data={<CreatedAtDisplay createdAt={data.createdAt as string} />}
                icon="register"
              />
              <PetRowData
                title={t("PETS.sex")}
                data={t(`PETS.${data.sex}`) as string}
                icon="gender"
              />
              <PetRowData
                title={t("PETS.breed")}
                data={data.breed}
                icon="breed"
              />
              <PetRowData
                title={t("PETS.color")}
                data={data.color}
                icon="color"
              />
              <PetRowData
                title={t("PETS.age")}
                data={<AgeDisplay birthday={data.birthday} />}
                icon="calendar"
              />
              <PetRowData
                title={t("PETS.allergies")}
                data={
                  data.allergies.length > 0 ? (
                    data.allergies.map((allergy, index) => (
                      <li
                        className="text__primary--gradient list-none dark:brightness-150"
                        key={index}
                      >
                        {index + 1}. {allergy}
                      </li>
                    ))
                  ) : (
                    <p className="text-initial">No allergies! 💪 </p>
                  )
                }
                icon="forbidden"
              />
              <PetRowData
                title={t("PETS.spaying")}
                data={data.spaying_status ? t("PETS.yes") : t("PETS.no")}
                icon="spaying"
              />
            </section>
          </main>
        </>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <NoDataMessage message={t(`PETS.no_pet_details`)} />
        </div>
      )}
    </>
  );
};
