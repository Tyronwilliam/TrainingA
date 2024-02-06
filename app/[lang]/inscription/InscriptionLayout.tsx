"use client";
import useToggle from "@/hooks/Basic/useToggle";
import useFormSubmission from "@/hooks/Formulaire/useFormSubmission";
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
import StepFive from "./StepFive";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import ButtonForm from "../components/ButtonForm";
import StepSix from "./StepSix";
import { handleApi } from "./function";

const InscriptionLayout = ({ dictionary }: { dictionary: Dictionary }) => {
  const {
    isSubmitting,
    submitError,
    startSubmission,
    finishSubmission,
    submitSuccess,
    setSubmitSuccess,
    isLoadInput,
    setIsLoadInput,
  } = useFormSubmission();

  const { toggle, open } = useToggle();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState("");
  const frSysteme = dictionary?.general?.form?.helpers?.frSysteme;
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
  console.log(formik?.errors, "ERRORS");
  console.log(formik?.values, "VALUES");

  const handleNext = async () => {
    await formik.validateForm();

    console.log(formik?.errors, "ERRORS");
    console.log(formik?.values, "VALUES");
    if (Object.keys(formik?.errors)?.length === 0) {
      const response = await handleApi(currentStep, formik?.values);
      console.log(response, "SHOW ME BRUV");
      const stepPlusUn = currentStep + 1;
      setCurrentStep(stepPlusUn);
    }
  };
  const handlePrev = async () => {
    const stepPlusUn = currentStep - 1;
    setCurrentStep(stepPlusUn);
  };
  const stepComponents = [
    <StepOne
      formik={formik}
      dictionary={dictionary}
      next={handleNext}
      key={"StepOne"}
    />,
    <StepTwo
      formik={formik}
      dictionary={dictionary}
      next={handleNext}
      key={"StepTwo"}
      isLoadInput={isLoadInput}
      setIsLoadInput={setIsLoadInput}
      open={open}
      toggle={toggle}
      isCurrentlyEditing={isCurrentlyEditing}
      setIsCurrentlyEditing={setIsCurrentlyEditing}
    />,
    <StepThree
      formik={formik}
      dictionary={dictionary}
      next={handleNext}
      key={"StepThree"}
    />,
    <StepFour
      formik={formik}
      dictionary={dictionary}
      next={handleNext}
      key={"StepFour"}
    />,
    <StepFive
      formik={formik}
      dictionary={dictionary}
      next={handleNext}
      isLoadInput={isLoadInput}
      setIsLoadInput={setIsLoadInput}
      open={open}
      toggle={toggle}
      isCurrentlyEditing={isCurrentlyEditing}
      setIsCurrentlyEditing={setIsCurrentlyEditing}
      key={"StepFive"}
    />,
    <StepSix
      formik={formik}
      dictionary={dictionary}
      next={handleNext}
      isLoadInput={isLoadInput}
      setIsLoadInput={setIsLoadInput}
      open={open}
      toggle={toggle}
      isCurrentlyEditing={isCurrentlyEditing}
      setIsCurrentlyEditing={setIsCurrentlyEditing}
      key={"StepSix"}
    />,
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
      {currentStep === 2 && (
        <p className="text-lg underline text-center">{frSysteme}</p>
      )}
      {stepComponents[currentStep]}
      <div className="shrink-0 grow basis-full text-center flex flex-wrap items-center justify-center mt-6 gap-4">
        {currentStep > 0 && (
          <ButtonForm
            isSubmitting={isSubmitting}
            formik={formik}
            dictionary={dictionary}
            content={dictionary?.cta?.formEvent?.previous}
            type="button"
            handleClick={handlePrev}
          />
        )}
        <ButtonForm
          isSubmitting={isSubmitting}
          formik={formik}
          dictionary={dictionary}
          content={dictionary?.cta?.formEvent?.next}
          type="submit"
          handleClick={handleNext}
        />
      </div>{" "}
    </form>
  );
};

export default InscriptionLayout;
