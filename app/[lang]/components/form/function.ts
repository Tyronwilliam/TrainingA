import { FormikProps } from "formik";
import { ChangeEvent, KeyboardEvent, WheelEvent } from "react";
import toast from "react-hot-toast";

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
export const limitInputNumber = (
  event: ChangeEvent<HTMLInputElement>,
  limitNumber: number,
  formik: FormikProps<any>,
  id: string
) => {
  const { value } = event.target;

  // Remove non-numeric characters and limit to 15 digits
  const cleanedValue = value.replace(/\D/g, "").slice(0, limitNumber);

  formik.setFieldValue(id, cleanedValue);
};

export const handleMultipleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  formik: FormikProps<any>,
  setIsLoadInput: (value: boolean) => void,
  error: string,
  id: string
) => {
  setIsLoadInput && setIsLoadInput(true);
  const selectedFiles: FileList | null = event?.currentTarget?.files;
  const arrayFile: File[] = [...formik?.values[id]];

  if (selectedFiles) {
    const arrayOfObjects = Object.values(selectedFiles);

    const filterNonFileObjects = arrayOfObjects?.filter(
      (file: File) => file instanceof File
    );

    if (filterNonFileObjects?.length > 3) {
      toast.error(error);
    } else {
      filterNonFileObjects.forEach((object) => {
        arrayFile.push(object);
      });
    }
    console.log(filterNonFileObjects, "NON FILE");

    await formik.setFieldValue(id, arrayFile);
    setIsLoadInput && setIsLoadInput(false);
  }
};
export const handleSingleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  formik: FormikProps<any>,
  setIsLoadInput: (value: boolean) => void,
  error: string,
  id: string
) => {
  setIsLoadInput && setIsLoadInput(true);
  const selectedFiles = event?.currentTarget?.files?.[0];
  await formik.setFieldValue(id, selectedFiles);
  setIsLoadInput && setIsLoadInput(false);

  console.log(event?.currentTarget?.files?.[0], "SINGLE");
};
