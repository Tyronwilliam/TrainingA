import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import React from "react";
import Inputs from "../components/form/Inputs";

const StepTwo = ({
  dictionary,
  formik,
  next,
}: {
  dictionary: Dictionary;
  formik: any;
  next: any;
}) => {
  const intermittentFalse = dictionary?.inscription?.stepTwo.default;
  const intermittentContent = dictionary?.inscription?.stepTwo.content;
  const intermittentTrue = { ...intermittentFalse, ...intermittentContent };
  const inputs: Record<string, StepType> = !formik?.values?.intermittent
    ? intermittentFalse
    : intermittentTrue;
  return <Inputs formik={formik} dictionary={dictionary} inputs={inputs} />;
};

export default StepTwo;
