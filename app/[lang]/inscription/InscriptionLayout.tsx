"use client";
import { Dictionary } from "@/types/dictionary";
import {
  StepOneSchema,
  StepTwoSchema,
  inscriptionInitialValues,
} from "@/utils/validationInscription";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const InscriptionLayout = ({ dictionary }: { dictionary: Dictionary }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const validationSchema = [StepOneSchema, StepTwoSchema];

  const formik = useFormik({
    initialValues: inscriptionInitialValues,
    validationSchema: validationSchema[currentStep],
    onSubmit: async (values) => {},
    //   handleSubmit(values, startSubmission, finishSubmission, executeRecaptcha),
  });
  const handleNext = async () => {
    await formik.validateForm();

    console.log(formik?.errors, "ERRORS");
    console.log(formik?.values, "VALUES");
    if (Object.keys(formik?.errors)?.length === 0) {
      const stepPlus = currentStep + 1;
      setCurrentStep(stepPlus);
    }
  };
  const stepComponents = [
    <StepOne formik={formik} dictionary={dictionary} next={handleNext} />,
    <StepTwo formik={formik} dictionary={dictionary} />,
  ];
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    (() => formik.validateForm())();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      {stepComponents[currentStep]}
      <button
        className="boutonSlideCommon shrink-0 text-lg max-w-[120px] w-full radius p-2.5 border-[1px] border-white"
        onClick={() => handleNext()}
        type="button"
      >
        Next
      </button>
    </form>
  );
};

export default InscriptionLayout;
