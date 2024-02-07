import React from "react";
import Inputs from "../../components/form/Inputs";
import { Dictionary } from "@/types/dictionary";
import { FormikProps } from "formik";
import { StepType } from "@/types/formulaire";

const StepFiveCheckbox = ({
  dictionary,
  formik,
}: {
  dictionary: Dictionary;
  formik: FormikProps<any>;
}) => {
  const checkBox: Record<string, StepType> =
    dictionary?.inscription?.stepFive.checkbox;
  return <Inputs formik={formik} dictionary={dictionary} inputs={checkBox} />;
};

export default StepFiveCheckbox;
