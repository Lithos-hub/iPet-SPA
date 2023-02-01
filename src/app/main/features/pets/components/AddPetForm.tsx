import { FC, useEffect, useMemo, useRef, useState, RefObject } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Formik } from "formik";
import { ModalLayout } from "@/components/Modal/ModalLayout";

import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import { Button } from "@/components/Button";

import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Chip,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

import { Pet, Pet_Backend } from "@/models/interfaces/Pet";

import dayjs from "dayjs";
import { useForm, useUIStore } from "@/hooks";
import { RootState } from "@/store";

import {
  useCreatePetMutation,
  useGetUserQuery,
  useUpdatePetMutation,
} from "@/services/apis";

import FILE_API from "@/services/File";
import { File_Backend } from "@/models/interfaces/File";
import { useImage } from "@/hooks/useImage";

interface Props {
  id: number | string;
}

export const AddPetForm: FC<Props> = ({ ...props }) => {
  const selectImageRef: RefObject<HTMLInputElement> = useRef(null);
  const formRef: RefObject<HTMLFormElement> = useRef(null);

  const { t } = useTranslation();
  const { i } = useImage();
  const { crud } = useSelector((state: RootState) => state.modalStore);
  const { user } = useSelector((state: RootState) => state.userStore);

  const { setCloseModals } = useUIStore();
  const [fileState, setFileState] = useState<File | undefined>(undefined);
  const [allergyState, setAllergyState] = useState<string[]>([]);
  const { allergy, onInputChange, onResetForm } = useForm({
    allergy: "",
  });

  const [createPet] = useCreatePetMutation();
  const [updatePet] = useUpdatePetMutation();
  const { refetch } = useGetUserQuery();

  useEffect(() => {
    setFileState(undefined);
  }, []);

  const activePet = useMemo<Pet_Backend | Pet>(
    () =>
      user?.pets.find((pet: Pet_Backend) => pet.id === props.id) || {
        name: "",
        sex: "male",
        weight: 1,
        weight_measure: "kg",
        birthday: new Date().getTime(),
        specie: "dog",
        breed: "",
        color: "",
        userId: "",
        imageUrl: "",
        allergies: [],
        spaying_status: false,
      },
    [props.id, user]
  );

  const onAccept = () => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  const onTranslate = (label: string) => t(`PETS.${label}`);

  const onSelectImageClick = () => selectImageRef.current?.click();

  const onSelectedFile = (event: any) => {
    setFileState(event.target.files[0]);
  };

  return (
    <ModalLayout title={t(`PETS.${crud}`)} onAccept={onAccept}>
      <Formik
        initialValues={activePet as Pet | Pet_Backend}
        validate={(values) => {
          const errors = {} as Record<string, string>;
          if (!values.name) errors.name = t("UI.ERRORS.pet_name");
          if (!values.weight) errors.weight = t("UI.ERRORS.pet_weight");
          if (!values.birthday) errors.birthday = t("UI.ERRORS.pet_birthday");
          if (!values.color) errors.color = t("UI.ERRORS.pet_color");
          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          const dataToBackend = {
            ...values,
            userId: localStorage.getItem("id"),
            allergies: allergyState,
          };
          if ((dataToBackend as Pet_Backend).id) {
            let fileResponse;
            if (fileState) {
              fileResponse = (await FILE_API.uploadFile({
                file: fileState as File,
                pet_id: (dataToBackend as Pet_Backend).id as string,
              })) as File_Backend;
            }
            const data = {
              ...dataToBackend,
              imageUrl: fileResponse ? fileResponse?.name : activePet.imageUrl,
            };
            await updatePet(data as Pet_Backend);
          } else {
            const { data } = (await createPet(dataToBackend as Pet)) as {
              data: Pet_Backend;
            };
            console.log("Created data: ", data);
            if (fileState) {
              const fileResponse = (await FILE_API.uploadFile({
                file: fileState as File,
                pet_id: data.id as string,
              })) as File_Backend;
              await updatePet({
                ...data,
                imageUrl: fileResponse.name,
              } as Pet_Backend);
            }
          }
          await refetch();
          setCloseModals();
          resetForm();
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          getFieldProps,
        }) => (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid grid-cols-3 gap-5"
          >
            <input
              ref={selectImageRef}
              type="file"
              onChange={onSelectedFile}
              className="hidden"
            />

            <div className="flex flex-col relative col-span-1">
              <label className="font-medium mr-auto p-2 text-black">
                {t("PETS.image")}
              </label>
              {values.imageUrl && (
                <div className="absolute top-12 right-2 bg-primary text-white shadow-xl rounded-full z-50">
                  <Button
                    variant="icon"
                    icon={<DeleteIcon />}
                    onClick={() => {
                      handleChange({
                        target: { name: "imageUrl", value: "" },
                      });
                    }}
                  />
                </div>
              )}
              <div className="relative max-h-[200px] w-full rounded-xl  duration-200">
                {values.imageUrl ? (
                  <img
                    src={i(`${values.imageUrl}`)}
                    alt="Pet's image"
                    className="rounded-xl object-cover w-full h-auto max-h-[200px] border-dashed border-2 border-pink-600 p-[2px]"
                  />
                ) : (
                  <div
                    className="h-full w-full border-dashed border-2 border-pink-600 min-h-[200px] rounded-xl cursor-pointer hover:opacity-50"
                    onClick={onSelectImageClick}
                  >
                    <strong className="text__primary--gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center max-w-[300px]">
                      {fileState ? (
                        <small className="font-medium text__primary text-center mx-auto mt-2 max-w-[300px] overflow-hidden">
                          {(fileState as File).name}
                        </small>
                      ) : (
                        <img
                          src="../img/no-image.png"
                          className="h-[100px] mx-auto"
                        />
                      )}
                    </strong>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <Input
                  {...getFieldProps(values.name)}
                  label={t("PETS.name")}
                  placeholder={t("PETS.name_placeholder") as string}
                  type="text"
                  bordered
                  name="name"
                  value={values.name}
                  hasError={!!errors.name}
                  errorMessage={t(`${errors.name}`) as string}
                />
                <Select
                  {...getFieldProps(values.specie)}
                  label={t("PETS.specie")}
                  placeholder={t("PETS.specie_placeholder") as string}
                  bordered
                  name="specie"
                  data={[
                    {
                      text: onTranslate("dog"),
                      value: "dog",
                    },
                    {
                      text: onTranslate("cat"),
                      value: "cat",
                    },
                  ]}
                  hasError={!!errors.specie}
                  errorMessage={t(`${errors.specie}`) as string}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Input
                  {...getFieldProps(values.breed)}
                  label={t("PETS.breed")}
                  placeholder={t("PETS.breed_placeholder") as string}
                  type="text"
                  bordered
                  value={values.breed}
                  name="breed"
                />
                <Input
                  {...getFieldProps(values.color)}
                  label={t("PETS.color")}
                  placeholder={t("PETS.color_placeholder") as string}
                  type="text"
                  bordered
                  value={values.color}
                  name="color"
                  hasError={!!errors.color}
                  errorMessage={t(`${errors.color}`) as string}
                />
              </div>
            </div>
            <div>
              <label className="font-medium p-2 text-black">
                {t("PETS.birthday")}
              </label>
              <div className="shadow-lg">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={localStorage.getItem("i18nextLng") as string}
                >
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    minDate={dayjs("1990-01-01")}
                    maxDate={dayjs(new Date())}
                    value={values.birthday}
                    onChange={(value) => {
                      handleChange({
                        target: { name: "birthday", value },
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <Input
                  {...getFieldProps(values.weight)}
                  label={t("PETS.weight")}
                  placeholder={t("PETS.weight_placeholder") as string}
                  type="number"
                  bordered
                  name="weight"
                  value={values.weight}
                  hasError={!!errors.weight}
                  errorMessage={t(`${errors.weight}`) as string}
                />
                <Select
                  {...getFieldProps(values.weight_measure)}
                  label={t("PETS.weight_measure")}
                  placeholder={t("PETS.weight_measure_placeholder") as string}
                  bordered
                  name="weight_measure"
                  data={[
                    {
                      text: onTranslate("label_kg"),
                      value: "kg",
                    },
                    {
                      text: onTranslate("label_lbs"),
                      value: "lbs",
                    },
                  ]}
                  hasError={!!errors.weight_measure}
                  errorMessage={t(`${errors.weight_measure}`) as string}
                />
              </div>

              <div>
                <Input
                  label={t("PETS.allergies")}
                  placeholder={t("PETS.allergies_placeholder") as string}
                  type="text"
                  bordered
                  name="allergy"
                  onChange={onInputChange}
                  onBlur={handleBlur}
                  value={allergy}
                  icon={<AddCircleIcon color="secondary" fontSize="large" />}
                  onIconClick={() => {
                    allergy &&
                      (setAllergyState([...allergyState, allergy]),
                      onResetForm());
                  }}
                />
                {allergyState.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {allergyState.map((allergy, index) => (
                      <Chip
                        key={index}
                        label={allergy}
                        onDelete={() =>
                          setAllergyState(
                            allergyState.filter((item) => item !== allergy)
                          )
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <label className="font-medium mr-auto p-2 text-black">
                  {t("PETS.sex")}
                </label>
                <div className="flex justify-center gap-5">
                  <div
                    className={`p-5 shadow-md rounded-xl cursor-pointer hover:scale-105 duration-200 ${
                      values.sex === "male" &&
                      "border shadow-blue-200 bg-sky-100"
                    }`}
                  >
                    <img
                      src={`/3d-icons/male.png`}
                      className="h-[50px]"
                      onClick={() => {
                        handleChange({
                          target: { name: "sex", value: "male" },
                        });
                      }}
                    />
                  </div>
                  <div
                    className={`p-5 shadow-md rounded-xl cursor-pointer hover:scale-105 duration-200 ${
                      values.sex === "female" &&
                      "border shadow-pink-200 bg-rose-100"
                    }`}
                  >
                    <img
                      src={`/3d-icons/female.png`}
                      className="h-[50px]"
                      onClick={() => {
                        handleChange({
                          target: { name: "sex", value: "female" },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="font-medium mr-auto p-2 text-black">
                  {t("PETS.spaying_neutering_status")}
                </label>
                <div className="mt-5 text-center">
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="radio-buttons-group-label"
                      defaultValue="yes"
                      name="spaying_status"
                      value={values.spaying_status}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label={t("PETS.yes")}
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label={t("PETS.no")}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </ModalLayout>
  );
};
