"use client";
import useFormSubmission from "@/hooks/Formulaire/useFormSubmission";
import { Dictionary } from "@/types/dictionary";
import { FormikContactProps } from "@/types/formulaire";
import { ContactSchema, initialValues } from "@/utils/validationContact";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ContactForm from "./ContactForm";
import ContactSuccess from "./ContactSuccess";
import { handleSubmit } from "./function";

type ContactFormProps = {
  dictionary: Dictionary;
};
const ContactFormLayout = ({ dictionary }: ContactFormProps) => {
  const {
    isSubmitting,
    submitError,
    startSubmission,
    finishSubmission,
    submitSuccess,
  } = useFormSubmission();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ContactSchema,
    onSubmit: async (values) =>
      handleSubmit(values, startSubmission, finishSubmission, executeRecaptcha),
  });

  useEffect(() => {
    (() => formik.validateForm())();
  }, []);

  return (
    <>
      {submitSuccess ? (
        <ContactSuccess dictionary={dictionary} />
      ) : (
        <ContactForm
          dictionary={dictionary}
          formik={formik}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}
    </>
  );
};

export default ContactFormLayout;
