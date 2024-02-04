import { Dictionary } from "@/types/dictionary";
import { FormikProps } from "formik";
import { ChangeEvent } from "react";

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
  open?: boolean;
  toggle?: () => void;
  isCurrentlyEditing?: string;
  setIsCurrentlyEditing?: (id: string) => void;
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
export interface HandlePutPortfolioPhotoParams {
  candidatId: number;
  jwt: string;
  value: File[];
  formik: FormikProps<any>;
  setIsLoadInput: (value: boolean) => void;
}
export interface HandleFileChangeParams {
  event: React.ChangeEvent<HTMLInputElement>;
  formik: FormikProps<any>;
  setIsLoadInput: (value: boolean) => void;
  error?: string;
  id: string;
  setIsCurrentlyEditing: (value: string) => void;
}
export interface LimitNumberParams {
  event: ChangeEvent<HTMLInputElement>;
  limit: number;
  formik: FormikProps<any>;
  id: string;
}
export interface PortfolioButtonsProps {
  handleButtonClick: (props: any) => void; // Adjust the type as needed
  buttonText: string;
  candidatId?: number;
  jwt?: string;
  value?: any; // Adjust the type as needed
  formik?: any; // Adjust the type as needed
  multiple: boolean | undefined;
  pictureLength: boolean | undefined;
  isDisabled?: boolean;
  setIsLoadInput?: (value: boolean) => void;
  errorText?: string;
  noInstanceFile?: boolean;
}
