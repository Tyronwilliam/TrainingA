"use client";
import useFormSubmission from "@/hooks/Formulaire/useFormSubmission";
import { Dictionary } from "@/types/dictionary";
import { ForgotInitialValues, ForgotSchema } from "@/utils/validationForgot";
import { useFormik } from "formik";
import { useEffect } from "react";
import ForgotForm from "./ForgotForm";
import { handleSubmit } from "./function";

const ForgotFormLayout = ({ dictionary }: { dictionary: Dictionary }) => {
  const {
    isSubmitting,
    submitError,
    startSubmission,
    finishSubmission,
    submitSuccess,
  } = useFormSubmission();
  const formik = useFormik({
    initialValues: ForgotInitialValues,
    validationSchema: ForgotSchema,
    onSubmit: async (values) => {
      handleSubmit(values, startSubmission, finishSubmission);
    },
  });

  useEffect(() => {
    (() => formik.validateForm())();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center gap-3">
      <h1 className="uppercase text-4xl">{dictionary?.forgot?.h1}</h1>
      {submitSuccess ? (
        <p>{dictionary?.forgot?.emailSend}</p>
      ) : (
        <>
          <p className="text-base">{dictionary?.forgot?.p}</p>{" "}
          <ForgotForm
            dictionary={dictionary}
            formik={formik}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        </>
      )}
    </div>
  );
};

export default ForgotFormLayout;
