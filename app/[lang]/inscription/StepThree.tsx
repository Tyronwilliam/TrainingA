import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";
import { useMemo } from "react";
import { filterObject } from "@/utils/form";

const StepThree = ({
  dictionary,
  formik,
  excludeField,
}: {
  dictionary: Dictionary;
  formik: any;
  excludeField?: string[];
}) => {
  const filtered = useMemo(() => {
    return filterObject(dictionary?.inscription?.stepThree, excludeField);
  }, [dictionary, excludeField]);
  const inputs: Record<string, StepType> =
    excludeField === undefined ? dictionary?.inscription?.stepThree : filtered;

  return <Inputs formik={formik} dictionary={dictionary} inputs={inputs} />;
};

export default StepThree;
