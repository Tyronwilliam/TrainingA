import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";
type StepFiveProps = {
  dictionary: Dictionary;
  formik: any;
  next: any;
  isLoadInput: boolean;
  setIsLoadInput: (isLoadInput: boolean) => void;
};
const StepFive = ({
  dictionary,
  formik,
  next,
  isLoadInput,
  setIsLoadInput,
}: StepFiveProps) => {
  const checkBox: Record<string, StepType> =
    dictionary?.inscription?.stepFive.checkbox;
  const inputs: Record<string, StepType> =
    dictionary?.inscription?.stepFive.default;

  return (
    <>
      <div className="flex flex-col md:flex-row md:flex-wrap w-fit items-center px-3 justify-center ">
        <Inputs formik={formik} dictionary={dictionary} inputs={checkBox} />
      </div>
      <Inputs
        formik={formik}
        dictionary={dictionary}
        inputs={inputs}
        isLoadInput={isLoadInput}
        setIsLoadInput={setIsLoadInput}
      />
    </>
  );
};

export default StepFive;
