import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";
type StepFiveProps = {
  dictionary: Dictionary;
  formik: any;
  next: any;
  isLoadInput: boolean;
  setIsLoadInput: (isLoadInput: boolean) => void;
  open: boolean;
  toggle: () => void;
  isCurrentlyEditing: string;
  setIsCurrentlyEditing: (id: string) => void;
};
const StepSix = ({
  dictionary,
  formik,
  next,
  isLoadInput,
  setIsLoadInput,
  open,
  toggle,
  setIsCurrentlyEditing,
  isCurrentlyEditing,
}: StepFiveProps) => {
  return (
    <>
      <Inputs
        formik={formik}
        dictionary={dictionary}
        inputs={dictionary?.inscription?.stepSix?.default}
        isLoadInput={isLoadInput}
        setIsLoadInput={setIsLoadInput}
        open={open}
        toggle={toggle}
        isCurrentlyEditing={isCurrentlyEditing}
        setIsCurrentlyEditing={setIsCurrentlyEditing}
      />
    </>
  );
};

export default StepSix;
