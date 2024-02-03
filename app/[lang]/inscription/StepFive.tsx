import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";

const StepFive = ({
  dictionary,
  formik,
  next,
}: {
  dictionary: Dictionary;
  formik: any;
  next: any;
}) => {
  const checkBox: Record<string, StepType> =
    dictionary?.inscription?.stepFive.checkbox;
  const inputs: Record<string, StepType> =
    dictionary?.inscription?.stepFive.default;

  return (
    <>
      <div className="flex flex-col md:flex-row md:flex-wrap w-fit items-center px-3 justify-center ">
        <Inputs formik={formik} dictionary={dictionary} inputs={checkBox} />
      </div>
      <Inputs formik={formik} dictionary={dictionary} inputs={inputs} />
    </>
  );
};

export default StepFive;
