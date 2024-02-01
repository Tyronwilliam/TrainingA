import { ErrorInput, InputString } from "@/app/InputLabel";
import React from "react";
import ButtonForm from "../../ButtonForm";
import { ContactFormProps } from "../../contact/ContactForm";
import { FormikProps } from "formik";
import { FormikForgotPropsWithoutPassword } from "@/types/formulaire";

interface ForgotFormProps extends Omit<ContactFormProps, "formik"> {
  formik: FormikProps<FormikForgotPropsWithoutPassword>;
}
const ForgotForm = ({
  formik,
  dictionary,
  submitError,
  isSubmitting,
}: ForgotFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      className="flex flex-col items-center justify-center w-full h-fit max-w-[730px] mt-7  gap-6"
    >
      <InputString
        id={"email"}
        formik={formik}
        label={dictionary.contact.label.email}
        placeholder="JohnDoe@exemple.com"
        requis={true}
      />{" "}
      <ErrorInput errorText={submitError} />
      <ButtonForm
        formik={formik}
        dictionary={dictionary}
        content={dictionary?.cta?.formEvent?.submit}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default ForgotForm;
