import { putDataPortfolio } from "@/services/formulaire/photo";
import { sendToast } from "@/utils/toast";
import { FormikProps } from "formik";
import { KeyboardEvent, WheelEvent } from "react";
import {
  HandleFileChangeParams,
  HandlePutPortfolioPhotoParams,
  LimitNumberParams,
} from "./type";

export const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault(); // Prevent manual input by arrow keys
  }
};
export const handleWheel = (event: WheelEvent<HTMLInputElement>) => {
  event.currentTarget.blur();
};
export const checkError = (formik: FormikProps<any>, id: string) => {
  return formik.touched[id] && formik.errors[id]
    ? formik.errors[id]?.toString()
    : "";
};
export const limitInputNumber = ({
  event,
  limit,
  formik,
  id,
}: LimitNumberParams) => {
  const { value } = event.target;

  // Remove non-numeric characters and limit to 15 digits
  const cleanedValue = value.replace(/\D/g, "").slice(0, limit);

  formik.setFieldValue(id, cleanedValue);
};

export const handleMultipleFileChange = async ({
  event,
  formik,
  setIsLoadInput,
  error,
  id,
  setIsCurrentlyEditing,
}: HandleFileChangeParams) => {
  setIsLoadInput && setIsLoadInput(true);
  const selectedFiles: FileList | null = event?.currentTarget?.files;
  const arrayFile: File[] = [...formik?.values[id]];

  if (selectedFiles) {
    const arrayOfObjects = Object.values(selectedFiles);

    const filterNonFile = arrayOfObjects?.filter(
      (file: File) => file instanceof File
    );

    if (filterNonFile?.length > 3) {
      error && sendToast(true, error);
    } else {
      filterNonFile.forEach((object) => {
        arrayFile.push(object);
      });
    }
    console.log(filterNonFile, "FILE");

    await formik.setFieldValue(id, arrayFile);
    setIsLoadInput && setIsLoadInput(false);
    setIsCurrentlyEditing("");
  }
};
export const handleSingleFileChange = async ({
  event,
  formik,
  setIsLoadInput,
  id,
  setIsCurrentlyEditing,
}: HandleFileChangeParams) => {
  setIsLoadInput && setIsLoadInput(true);
  const selectedFiles = event?.currentTarget?.files?.[0];
  await formik.setFieldValue(id, selectedFiles);
  setIsLoadInput && setIsLoadInput(false);
  setIsCurrentlyEditing("");
  console.log(event?.currentTarget?.files?.[0], "SINGLE");
};

export const handlePutPortfolioPhoto = async ({
  candidatId,
  jwt,
  value,
  formik,
}: HandlePutPortfolioPhotoParams) => {
  const response = await putDataPortfolio({
    candidatId,
    jwt,
    files: value,
    formik,
  });

  console.log(response, "FROM HANDLEPUT");
  if (response?.status === 200) {
    sendToast(false, "Photos ajouté");
  } else {
    const error = response?.response?.data?.error?.message
      ? response?.response?.data?.error?.message
      : "An error occurred";
    sendToast(true, error);
  }
};
