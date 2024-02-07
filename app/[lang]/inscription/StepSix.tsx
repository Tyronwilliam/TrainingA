import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";
type StepFiveProps = {
  dictionary: Dictionary;
  formik: any;
  isLoadInput: boolean;
  setIsLoadInput: (isLoadInput: boolean) => void;
  open: boolean;
  toggle: () => void;
  isCurrentlyEditing: string;
  setIsCurrentlyEditing: (id: string) => void;
  inputs: Record<string, StepType>;
  candidatId?: number | "" | undefined;
  jwt?: string;
};
const StepSix = ({
  dictionary,
  formik,
  isLoadInput,
  setIsLoadInput,
  open,
  toggle,
  setIsCurrentlyEditing,
  isCurrentlyEditing,
  inputs,
  candidatId,
  jwt,
}: StepFiveProps) => {
  return (
    <>
      <Inputs
        formik={formik}
        dictionary={dictionary}
        isLoadInput={isLoadInput}
        setIsLoadInput={setIsLoadInput}
        inputs={inputs}
        open={open}
        toggle={toggle}
        isCurrentlyEditing={isCurrentlyEditing}
        setIsCurrentlyEditing={setIsCurrentlyEditing}
        candidatId={candidatId}
        jwt={jwt}
      />
    </>
  );
};

export default StepSix;
