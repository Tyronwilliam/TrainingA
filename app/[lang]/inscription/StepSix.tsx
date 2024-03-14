import { Dictionary } from "@/types/dictionary";
import { StepType } from "@/types/formulaire";
import Inputs from "../components/form/Inputs";
import { useMemo } from "react";
import { filterObject } from "@/utils/form";
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
  jwt: string | undefined;
  excludeField?: string[];
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
  excludeField,
}: StepFiveProps) => {
  const filteredExcludeField = useMemo(() => {
    return formik?.values?.photodepresentation === null ||
      formik?.values?.photodepresentation instanceof File
      ? excludeField!
      : [...excludeField!, "photodepresentation"];
  }, [formik?.values?.photodepresentation, excludeField]);

  const filteredInputs = useMemo(() => {
    return filterObject(inputs, filteredExcludeField);
  }, [dictionary, filteredExcludeField, inputs]);
  const correctInputs: any =
    excludeField === undefined ? inputs : filteredInputs;
  return (
    <>
      <Inputs
        formik={formik}
        dictionary={dictionary}
        isLoadInput={isLoadInput}
        setIsLoadInput={setIsLoadInput}
        inputs={correctInputs}
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
