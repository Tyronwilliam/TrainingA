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
};
export type InputPasswordPropsWithShow = Omit<InputLabelProps, "placeholder">;
export type InputLabelPropsWithCustomClass = InputLabelProps & {
  classStyle?: string;
};
export type InputLabelPropsWithLimit = InputLabelProps & {
  limitNumber: number;
};
export type InputSelectPropsWithOptions = Omit<
  InputLabelProps,
  "placeholder"
> & {
  options: string[];
  dictionary: Dictionary;
};
export type ErrorInputProps = {
  errorText: string | undefined;
};
export type LabelProps = {
  label: string;
  requis?: boolean;
  errorText: string | undefined;
  value: string | number | undefined | boolean | null;
};
