"use client";
import { Dictionary } from "@/types/dictionary";
import {
  StepFiveSchema,
  StepFourSchema,
  StepOneSchema,
  StepSixSchema,
  StepThreeSchema,
  StepTwoSchema,
  inscriptionInitialValues,
} from "@/utils/validationInscription";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const InscriptionLayout = ({ dictionary }: { dictionary: Dictionary }) => {
  const [currentStep, setCurrentStep] = useState(4);
  const validationSchema = [
    StepOneSchema,
    StepTwoSchema,
    StepThreeSchema,
    StepFourSchema,
    StepFiveSchema,
    StepSixSchema,
  ];

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
    <StepTwo formik={formik} dictionary={dictionary} next={handleNext} />,
    <StepThree formik={formik} dictionary={dictionary} next={handleNext} />,
    <StepFour formik={formik} dictionary={dictionary} next={handleNext} />,
    <StepFive formik={formik} dictionary={dictionary} next={handleNext} />,
  ];
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    (() => formik.validateForm())();
  }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col flex-wrap items-center justify-center w-full max-w-[700px] mt-7 m-auto mb-10 md:flex-row md:flex-wrap gap-6"
    >
      {stepComponents[currentStep]}
      <div className="shrink-0 grow basis-full text-center mt-6">
        <button
          className="boutonSlideCommon text-lg max-w-[120px] w-full radius p-2.5 border-[1px] border-white"
          onClick={() => handleNext()}
          type="button"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default InscriptionLayout;
