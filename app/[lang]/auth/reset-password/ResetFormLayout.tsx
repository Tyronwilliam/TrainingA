"use client";
import useFormSubmission from "@/hooks/Formulaire/useFormSubmission";
import { Dictionary } from "@/types/dictionary";
import {
  ResetPassworInitialValues,
  ResetPassworSchema,
} from "@/utils/validationReset";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import ResetForm from "./ResetForm";
import { handleSubmit } from "./function";
import useCustomRouter from "@/hooks/Basic/useCustomRouter";

const ResetFormLayout = ({ dictionary }: { dictionary: Dictionary }) => {
  const {
    isSubmitting,
    submitError,
    startSubmission,
    finishSubmission,
    submitSuccess,
  } = useFormSubmission();
  const { router, pathname, routerPushTo, searchParams } = useCustomRouter();
  const code = searchParams.get("code");

  const formik = useFormik({
    initialValues: ResetPassworInitialValues,
    validationSchema: ResetPassworSchema,
    onSubmit: async (values) => {
      handleSubmit(
        values,
        code,
        startSubmission,
        finishSubmission,
        routerPushTo
      );
    },
  });

  useEffect(() => {
    (() => formik.validateForm())();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center gap-3">
      <h1 className="uppercase text-4xl">{dictionary?.reset?.h1}</h1>
      <ResetForm
        dictionary={dictionary}
        formik={formik}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  );
};

export default ResetFormLayout;
