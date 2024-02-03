import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
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
  const enAgenceFalse: Record<string, StepType> =
    dictionary?.inscription?.stepFour.default.default;

  const checkbox: Record<string, StepType> =
    dictionary?.inscription?.stepFour.default?.checkbox;

  const agenceContent = dictionary?.inscription?.stepFour.content;
  const enAgenceTrue = { ...enAgenceFalse, ...agenceContent };
  const inputs: Record<string, StepType> = !formik?.values?.agence
    ? enAgenceFalse
    : enAgenceTrue;
  return (
    <>
      <div className="flex flex-col md:flex-row md:flex-wrap w-fit items-center px-3 justify-center box__lastChild">
        <Inputs formik={formik} dictionary={dictionary} inputs={checkbox} />
      </div>
      <Inputs formik={formik} dictionary={dictionary} inputs={inputs} />
    </>
  );
};

export default StepFour;
