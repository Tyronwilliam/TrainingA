import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";

const StepFour = ({
  dictionary,
  formik,
}: {
  dictionary: Dictionary;
  formik: any;
}) => {
  const enAgenceFalse: Record<string, StepType> =
    dictionary?.inscription?.stepFour.default.default;

  const checkbox: Record<string, StepType> =
    dictionary?.inscription?.stepFour.default?.checkbox;
  const physique: Record<string, StepType> =
    dictionary?.inscription?.stepFour.default?.checkboxPhysique;
  const agenceContent = dictionary?.inscription?.stepFour.content;
  const enAgenceTrue = { ...enAgenceFalse, ...agenceContent };
  const inputs: Record<string, StepType> = !formik?.values?.agence
    ? enAgenceFalse
    : enAgenceTrue;
  return (
    <>
      <section>
        <h2 className="text-center text-2xl mb-5 font-bold uppercase">
          {dictionary?.inscription?.stepFour?.section[0]}
        </h2>
        <div className="flex flex-col md:flex-row md:flex-wrap w-fit items-center px-3 justify-center box__lastChild">
          <Inputs formik={formik} dictionary={dictionary} inputs={checkbox} />
        </div>
      </section>
      <section>
        <h2 className="text-center text-2xl mb-5 font-bold uppercase">
          {dictionary?.inscription?.stepFour?.section[1]}
        </h2>
        <div className="flex flex-col md:flex-row md:flex-wrap w-fit items-center px-3 justify-center box__lastChild ">
          <Inputs formik={formik} dictionary={dictionary} inputs={physique} />
        </div>
      </section>
      <Inputs formik={formik} dictionary={dictionary} inputs={inputs} />
    </>
  );
};

export default StepFour;
