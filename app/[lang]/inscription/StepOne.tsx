import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Input from "../components/form/Input";

const StepOne = ({
  dictionary,
  formik,
  next,
}: {
  dictionary: Dictionary;
  formik: any;
  next: any;
}) => {
  const inputs: StepType = dictionary?.inscription?.stepOne;
  return <Input formik={formik} dictionary={dictionary} inputs={inputs} />;
};

export default StepOne;
