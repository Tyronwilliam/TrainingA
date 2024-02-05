import {
  ErrorInput,
  InputPassword,
} from "@/app/[lang]/components/form/InputLabel";
import { FormikResetPasswordProps } from "@/types/formulaire";
import { FormikProps } from "formik";
import ButtonForm from "../../components/ButtonForm";
import { ContactFormProps } from "../../contact/ContactForm";
interface ResetFormProps extends Omit<ContactFormProps, "formik"> {
  formik: FormikProps<FormikResetPasswordProps>;
}
const ResetForm = ({
  formik,
  dictionary,
  submitError,
  isSubmitting,
}: ResetFormProps) => {
  return (
    <form
      onClick={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      className="flex flex-col items-center justify-center w-full h-fit max-w-[730px] mt-7  gap-6"
    >
      <InputPassword
        requis={true}
        id={"password"}
        formik={formik}
        label={dictionary.general.form.password}
      />{" "}
      <InputPassword
        requis={true}
        id={"passwordConfirmation"}
        formik={formik}
        label={dictionary.general.form.passwordConfirmation}
      />{" "}
      <ErrorInput errorText={submitError} />{" "}
      <ButtonForm
        dictionary={dictionary}
        formik={formik}
        isSubmitting={isSubmitting}
        content={dictionary.cta.formEvent.submit}
        type="submit"
      />
    </form>
  );
};

export default ResetForm;
