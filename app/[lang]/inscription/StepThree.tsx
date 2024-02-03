import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";

const StepThree = ({
  dictionary,
  formik,
  next,
}: {
  dictionary: Dictionary;
  formik: any;
  next: any;
}) => {
  const inputs: Record<string, StepType> = dictionary?.inscription?.stepThree;
  return <Inputs formik={formik} dictionary={dictionary} inputs={inputs} />;
};

export default StepThree;
