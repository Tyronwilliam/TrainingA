import React from "react";
import {
  InputCheckBox,
  InputNumber,
  InputPassword,
  InputSelect,
  InputString,
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
        // Do something with key and value
        const { label, placeholder, required, type, helpers, limit, options } =
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
                helpers={helpers}
              />
            )}
            {type === "password" && (
              <InputPassword
                id={key}
                formik={formik}
                label={label}
                requis={required}
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
              />
            )}
            {type === "checkbox" && (
              <InputCheckBox
                id={key}
                formik={formik}
                label={label}
                requis={required}
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
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Inputs;
