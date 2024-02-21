import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";

export type StepFiveProps = {
  dictionary: Dictionary;
  formik: any;
  isLoadInput: boolean;
  setIsLoadInput: (isLoadInput: boolean) => void;
  open: boolean;
  toggle: () => void;
  isCurrentlyEditing: string;
  setIsCurrentlyEditing: (id: string) => void;
  candidatId?: number | "" | undefined;
  jwt?: string;
};
const StepFive = ({
  dictionary,
  formik,
  isLoadInput,
  setIsLoadInput,
  open,
  toggle,
  setIsCurrentlyEditing,
  isCurrentlyEditing,
  candidatId,
  jwt,
}: StepFiveProps) => {
  const checkBox: Record<string, StepType> =
    dictionary?.inscription?.stepFive.checkbox;
  const inputs: Record<string, StepType> =
    dictionary?.inscription?.stepFive.default;

  return (
    <>
      <div className="flex flex-col md:flex-row md:flex-wrap w-fit items-center px-3 justify-center ">
        <Inputs
          formik={formik}
          dictionary={dictionary}
          inputs={checkBox}
          candidatId={candidatId}
          jwt={jwt}
        />
      </div>
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
    </>
  );
};

export default StepFive;
