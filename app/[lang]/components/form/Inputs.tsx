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

type InputProps = {
  inputs: StepType;
  formik: FormikProps<any>;
  dictionary: Dictionary;
};
const Inputs = ({ inputs, formik, dictionary }: InputProps) => {
  return (
    <>
      {Object.entries(inputs).map(([key, value]) => {
        const { label, placeholder, required, type, helper, limit, options } =
          value;

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
              />
            )}
            {/* TextArea = ({
              id,
              formik,
              label,
              classStyle,
              requis,
              helper, */}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Inputs;
