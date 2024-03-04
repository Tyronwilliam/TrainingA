import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";
import { StepFiveProps } from "./StepFive";

const StepTwo = ({
  dictionary,
  formik,
  isLoadInput,
  setIsLoadInput,
  open,
  toggle,
  setIsCurrentlyEditing,
  isCurrentlyEditing,
  jwt,
  candidatId,
}: StepFiveProps) => {
  const intermittentFalse = dictionary?.inscription?.stepTwo.default;
  const intermittentContent = dictionary?.inscription?.stepTwo.content;
  const intermittentTrue = { ...intermittentFalse, ...intermittentContent };
  const inputs: Record<string, StepType> = !formik?.values?.intermittent
    ? intermittentFalse
    : intermittentTrue;

  return (
    <Inputs
      formik={formik}
      dictionary={dictionary}
      inputs={inputs}
      isLoadInput={isLoadInput}
      setIsLoadInput={setIsLoadInput}
      open={open}
      toggle={toggle}
      isCurrentlyEditing={isCurrentlyEditing}
      setIsCurrentlyEditing={setIsCurrentlyEditing}
      candidatId={candidatId}
      jwt={jwt}
    />
  );
};

export default StepTwo;
