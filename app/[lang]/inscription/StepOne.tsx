import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";
import { FormikProps } from "formik";
import { useMemo } from "react";
import { filterObject } from "@/utils/form";

const StepOne = ({
  dictionary,
  formik,
  excludeField,
}: {
  dictionary: Dictionary;
  formik: FormikProps<any>;
  excludeField?: string[];
}) => {
  const filtered = useMemo(() => {
    return filterObject(dictionary?.inscription?.stepOne, excludeField);
  }, [dictionary, excludeField]);

  const inputs: Record<string, StepType> =
    excludeField === undefined ? dictionary?.inscription?.stepOne : filtered;

  return <Inputs formik={formik} dictionary={dictionary} inputs={inputs} />;
};

export default StepOne;
