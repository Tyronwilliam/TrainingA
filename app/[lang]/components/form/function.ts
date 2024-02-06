import { deletePhotos, putDataPortfolio } from "@/services/formulaire/photo";
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
  const cleanedValue = value.replace(/\D/g, "").slice(0, limit);
  formik.setFieldValue(id, cleanedValue);
};

export const handleMultipleFileChange = async ({
  event,
  formik,
  setIsLoadInput,
  error,
  id,
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
    await formik.setFieldValue(id, arrayFile);
    setIsLoadInput && setIsLoadInput(false);
  }
};
export const handleSingleFileChange = async ({
  event,
  formik,
  setIsLoadInput,
  id,
}: HandleFileChangeParams) => {
  setIsLoadInput && setIsLoadInput(true);
  const selectedFiles = event?.currentTarget?.files?.[0];
  console.log(selectedFiles, "+++++++", id);
  await formik.setFieldValue(id, selectedFiles);
  setIsLoadInput && setIsLoadInput(false);
};

export const handlePutPortfolioPhoto = async ({
  candidatId,
  jwt,
  value,
  formik,
  setIsLoadInput,
  id,
}: HandlePutPortfolioPhotoParams) => {
  setIsLoadInput(true);
  const response = await putDataPortfolio({
    candidatId,
    jwt,
    files: value,
    formik,
    id,
  });
  if (response?.status === 200) {
    sendToast(false, "Photos ajouté");
    setIsLoadInput(false);
  } else {
    const error = response?.response?.data?.error?.message
      ? response?.response?.data?.error?.message
      : "An error occurred";
    sendToast(true, error);
    setIsLoadInput(false);
  }
};
export const handleFileChange = ({
  event,
  formik,
  setIsLoadInput,
  id,
  multiple,
  error,
}: HandleFileChangeParams & { multiple: boolean | undefined }): void => {
  if (multiple) {
    handleMultipleFileChange({
      event,
      formik,
      setIsLoadInput,
      error: error,
      id,
    });
  } else {
    handleSingleFileChange({
      event,
      formik,
      setIsLoadInput,
      id,
    });
  }
};

export const deleteFile = async (
  file: any,
  value: any[],
  formik: FormikProps<any>,
  id: string,
  jwt: string
) => {
  if (file instanceof File) {
    const removeFile = value?.filter((f) => f.name !== file?.name);
    formik.setFieldValue(id, removeFile);
  } else {
    const response = await deletePhotos({ file, jwt });
    //@ts-ignore
    if (response?.status === 200) {
      const removeFile = value?.filter((f) => f.id !== file?.id);
      formik.setFieldValue(id, removeFile);
    } else {
      //@ts-ignore
      const error = response?.response?.data?.error?.message
        ? //@ts-ignore
          response?.response?.data?.error?.message
        : "An error occurred";
      sendToast(true, error);
    }
  }
};
