import { Dictionary } from "@/types/dictionary";
import { FormikProps } from "formik";

export type InputLabelProps = {
  id: string;
  formik: FormikProps<any>;
  label: string;
  placeholder: string;
  requis?: boolean;
  type?: string;
  helper?: string;
  dictionary?: Dictionary;
};
export type InputPasswordPropsWithShow = Omit<InputLabelProps, "placeholder">;
export type InputLabelPropsWithCustomClass = InputLabelProps & {
  classStyle?: string;
};
export type InputLabelPropsWithLimit = InputLabelProps & {
  limitNumber: number | undefined;
};
export type InputSelectPropsWithOptions = Omit<
  InputLabelProps,
  "placeholder"
> & {
  options: Record<string, string> | undefined;
  dictionary: Dictionary;
};
export type InputPhotoProps = Omit<InputLabelProps, "placeholder"> & {
  limit: number | undefined;
  accept: string | undefined;
  multiple: boolean | undefined;
  isLoadInput?: boolean;
  setIsLoadInput?: (isLoadInput: boolean) => void;
};
export type ErrorInputProps = {
  errorText: string | undefined;
};
export type LabelProps = {
  label: string;
  requis?: boolean;
  errorText: string | undefined;
  value: string | number | undefined | boolean | null;
  length?: number;
  limit?: number;
};
