import { FormikProps } from "formik";
import { ChangeEvent, KeyboardEvent, WheelEvent } from "react";

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
