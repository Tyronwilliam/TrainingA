import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import React from "react";
import Inputs from "../components/form/Inputs";

const StepFour = ({
  dictionary,
  formik,
  next,
}: {
  dictionary: Dictionary;
  formik: any;
  next: any;
}) => {
  const enAgenceFalse = dictionary?.inscription?.stepFour.default;
  const agenceContent = dictionary?.inscription?.stepFour.content;
  const enAgenceTrue = { ...enAgenceFalse, ...agenceContent };
  const inputs: StepType = !formik?.values?.agence
    ? enAgenceFalse
    : enAgenceTrue;
  return <Inputs formik={formik} dictionary={dictionary} inputs={inputs} />;
};

export default StepFour;
