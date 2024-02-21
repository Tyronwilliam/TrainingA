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
import Disclaimer from "./Disclaimer";
import classNames from "classnames";
import Success from "./Success";
import cookieCutter from "@boiseitguru/cookie-cutter";

const InscriptionLayout = ({ dictionary }: { dictionary: Dictionary }) => {
  const {
    isSubmitting,
    isLoadInput,
    setIsLoadInput,
    startSubmission,
    finishSubmission,
  } = useFormSubmission();

  const jwt = cookieCutter.get("jwt");
  const candidatIdCookie = cookieCutter.get("candidatId");
  const candidatId: number | "" | undefined =
    candidatIdCookie && parseInt(candidatIdCookie);

  const { toggle, open } = useToggle();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState("");
  const frSysteme = dictionary?.general?.form?.helpers?.frSysteme;
  const validationSchema = [
    "",
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
  });

  const handleNext = async () => {
    await formik.validateForm();
    if (Object.keys(formik?.errors)?.length === 0) {
      if (currentStep === 4 || currentStep === 0) {
        const stepPlusUn = currentStep + 1;
        setCurrentStep(stepPlusUn);
      } else {
        startSubmission();
        const response = await handleApi(currentStep, formik?.values);
        if (response?.status === 200) {
          finishSubmission("");
          const stepPlusUn = currentStep + 1;
          setCurrentStep(stepPlusUn);
        } else {
          finishSubmission("");
        }
      }
    }
  };
  const stepComponents = [
    <Disclaimer dictionary={dictionary} key={"StepZero"} />,
    <StepOne formik={formik} dictionary={dictionary} key={"StepOne"} />,
    <StepTwo
      formik={formik}
      dictionary={dictionary}
      key={"StepTwo"}
      isLoadInput={isLoadInput}
      setIsLoadInput={setIsLoadInput}
      open={open}
      toggle={toggle}
      isCurrentlyEditing={isCurrentlyEditing}
      setIsCurrentlyEditing={setIsCurrentlyEditing}
      candidatId={candidatId}
      jwt={jwt}
    />,
    <StepThree formik={formik} dictionary={dictionary} key={"StepThree"} />,
    <StepFour formik={formik} dictionary={dictionary} key={"StepFour"} />,
    <StepFive
      formik={formik}
      dictionary={dictionary}
      isLoadInput={isLoadInput}
      setIsLoadInput={setIsLoadInput}
      open={open}
      toggle={toggle}
      isCurrentlyEditing={isCurrentlyEditing}
      setIsCurrentlyEditing={setIsCurrentlyEditing}
      key={"StepFive"}
      candidatId={candidatId}
      jwt={jwt}
    />,
    <StepSix
      formik={formik}
      dictionary={dictionary}
      isLoadInput={isLoadInput}
      setIsLoadInput={setIsLoadInput}
      open={open}
      toggle={toggle}
      inputs={dictionary?.inscription?.stepSix?.default}
      isCurrentlyEditing={isCurrentlyEditing}
      setIsCurrentlyEditing={setIsCurrentlyEditing}
      key={"StepSix"}
      candidatId={candidatId}
      jwt={jwt}
    />,
    <Success dictionary={dictionary} key={"StepSeven"} />,
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
      className={classNames({
        "flex flex-col flex-wrap justify-center h-full  w-full max-w-[700px] mt-7 m-auto mb-10 md:flex-row md:flex-wrap gap-6":
          true,
        "items-center justify-center  shrink-0 ": currentStep === 0,
        "items-center justify-center mb-0 mt-0 shrink-0 grow":
          currentStep === 7,
      })}
    >
      {currentStep === 3 && (
        <p className="text-lg underline text-center">{frSysteme}</p>
      )}
      {stepComponents[currentStep]}
      {currentStep < 7 && (
        <div className="shrink-0 grow basis-full text-center flex flex-wrap items-center justify-center mt-6 gap-4">
          <>
            {currentStep === 0 && (
              <button
                type="button"
                onClick={handleNext}
                className="boutonSlideCommon shrink-0 text-lg max-w-[120px] w-full radius p-2.5 border-[1px] border-white"
              >
                {dictionary?.cta?.formEvent?.next}
              </button>
            )}

            {currentStep > 0 && (
              <ButtonForm
                isSubmitting={isSubmitting}
                formik={formik}
                dictionary={dictionary}
                content={dictionary?.cta?.formEvent?.next}
                type="submit"
                handleClick={handleNext}
              />
            )}
          </>
        </div>
      )}
    </form>
  );
};

export default InscriptionLayout;
