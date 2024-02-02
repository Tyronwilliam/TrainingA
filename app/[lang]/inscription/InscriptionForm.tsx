import { Dictionary } from "@/types/dictionary";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const InscriptionForm = ({
  dictionary,
  formik,
  next,
}: {
  dictionary: Dictionary;
  formik: any;
  next: any;
}) => {
  return (
    <form>
      <StepOne formik={formik} dictionary={dictionary} />
      <StepTwo formik={formik} dictionary={dictionary} />
    </form>
  );
};

export default InscriptionForm;
