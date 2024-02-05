import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";

const StepOne = ({
  dictionary,
  formik,
  next,
}: {
  dictionary: Dictionary;
  formik: any;
  next: any;
}) => {
  const inputs: Record<string, StepType> = dictionary?.inscription?.stepOne;
  return <Inputs formik={formik} dictionary={dictionary} inputs={inputs} />;
};

export default StepOne;
