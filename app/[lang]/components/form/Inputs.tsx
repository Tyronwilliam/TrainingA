import React from "react";
import {
  InputCheckBox,
  InputNumber,
  InputPassword,
  InputSelect,
  InputString,
  TextArea,
} from "./InputLabel";
import { StepType } from "@/types/formulaire";
import { FormikProps } from "formik";
import { Dictionary } from "@/types/dictionary";
import InputPhoto from "./InputPhoto";

type InputProps = {
  inputs: Record<string, StepType>;
  formik: FormikProps<any>;
  dictionary: Dictionary;
  isLoadInput?: boolean;
  setIsLoadInput?: (isLoadInput: boolean) => void;
  open?: boolean;
  toggle?: () => void;
  isCurrentlyEditing?: string;
  setIsCurrentlyEditing?: (id: string) => void;
  candidatId?: number | "" | undefined;
  jwt?: string | undefined;
};
const Inputs = ({
  inputs,
  formik,
  dictionary,
  isLoadInput,
  setIsLoadInput,
  open,
  toggle,
  setIsCurrentlyEditing,
  isCurrentlyEditing,
  candidatId,
  jwt,
}: InputProps) => {
  return (
    <>
      {Object.entries(inputs).map(([key, value]) => {
        const {
          label,
          placeholder,
          required,
          type,
          helper,
          limit,
          options,
          accept,
          multiple,
          pattern,
        } = value;

        return (
          <React.Fragment key={key}>
            {(type === "email" || type === "date" || type === "text") && (
              <InputString
                id={key}
                formik={formik}
                label={label}
                placeholder={placeholder}
                requis={required}
                type={type}
                helper={helper}
                pattern={pattern}
                limit={limit}
              />
            )}
            {type === "password" && (
              <InputPassword
                id={key}
                formik={formik}
                label={label}
                requis={required}
                helper={helper}
              />
            )}
            {type === "number" && (
              <InputNumber
                id={key}
                formik={formik}
                label={label}
                requis={required}
                limitNumber={limit}
                placeholder={placeholder}
                helper={helper}
              />
            )}
            {type === "checkbox" && (
              <InputCheckBox
                id={key}
                formik={formik}
                label={label}
                requis={required}
                helper={helper}
                placeholder={placeholder}
              />
            )}
            {type === "select" && (
              <InputSelect
                id={key}
                formik={formik}
                label={label}
                requis={required}
                options={options}
                dictionary={dictionary}
                helper={helper}
              />
            )}
            {type === "textarea" && (
              <TextArea
                id={key}
                formik={formik}
                label={label}
                requis={required}
                helper={helper}
                placeholder={placeholder}
                classStyle="main__height"
              />
            )}
            {type === "photo" && (
              <InputPhoto
                id={key}
                formik={formik}
                label={label}
                requis={required}
                helper={helper}
                accept={accept}
                limit={limit}
                multiple={multiple}
                isLoadInput={isLoadInput}
                setIsLoadInput={setIsLoadInput}
                dictionary={dictionary}
                open={open}
                toggle={toggle}
                isCurrentlyEditing={isCurrentlyEditing}
                setIsCurrentlyEditing={setIsCurrentlyEditing}
                jwt={jwt}
                candidatId={candidatId}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Inputs;
