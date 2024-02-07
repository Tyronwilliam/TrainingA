"use client";
import { useState } from "react";
import Tab from "./Tab";
import { useFormik } from "formik";
import {
  StepFiveSchema,
  StepFourSchema,
  StepOneSchema,
  StepSixSchema,
  StepThreeSchema,
  StepTwoSchema,
  inscriptionInitialValues,
} from "@/utils/validationInscription";
import { Dictionary } from "@/types/dictionary";
import StepOne from "../../inscription/StepOne";
import StepTwo from "../../inscription/StepTwo";
import useFormSubmission from "@/hooks/Formulaire/useFormSubmission";
import useToggle from "@/hooks/Basic/useToggle";
import StepThree from "../../inscription/StepThree";
import StepFour from "../../inscription/StepFour";
import StepFiveCheckbox from "./StepFiveCheckbox";
import StepSix from "../../inscription/StepSix";

const excludeField = [
  "email",
  "password",
  "nomDeNaissance",
  "firstname",
  "gender",
  "dateOfBirth",
  "birthCity",
  "birthPostal",
  "birthCountry",
  "nationality",
  "yeux",
  "origine",
  "photodepresentation",
  "autresphotos",
];
// 1- I'm feeling emotional... (a chill mix) et 2- No Sleep | A Chill Mix sur la chaine MrSuicideSheep , je l'ai grave poncé y a qlq années c pas jazzy mais plutot chill
// MEC OUBLIE PAS DE FAIRE LA FONCTION DANS ISNCRIPTION SI LUSER EXISTE DEJA
// et de le logguer
const ProfilLayout = ({ dictionary }: { dictionary: Dictionary }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState("");
  const { toggle, open } = useToggle();
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
  const mergedStepSix = {
    ...dictionary?.inscription?.stepSix?.default,
    ...dictionary?.inscription?.stepSix?.content,
  };

  const validationSchema: any = [
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
    //   handleSubmit(values, startSubmission, finishSubmission, executeRecaptcha),
  });

  const handleTab = (tab: string | null) => {
    if (currentTab === tab) {
      // If the same tab is clicked again, close the dropdown
      setCurrentTab(null);
    } else {
      // If a different tab is clicked, set the currentTab and then toggle
      setCurrentTab(tab);
    }
  };
  // Externaliser le display des tabs
  // Dans le layout on ne veut que les composants
  return (
    <section className="flex flex-col w-full items-center justify-center ">
      <Tab currentTab={currentTab} handleClick={handleTab} index={"Général"}>
        <StepOne
          formik={formik}
          dictionary={dictionary}
          key={"StepOne"}
          excludeField={excludeField}
        />
      </Tab>
      <Tab
        currentTab={currentTab}
        handleClick={handleTab}
        index={"Administratif"}
      >
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
        />
      </Tab>
      <Tab
        currentTab={currentTab}
        handleClick={handleTab}
        index={"Physionomie"}
      >
        <StepThree
          formik={formik}
          dictionary={dictionary}
          key={"StepThree"}
          excludeField={excludeField}
        />
      </Tab>
      <Tab
        currentTab={currentTab}
        handleClick={handleTab}
        index={"Compétences"}
      >
        <StepFour formik={formik} dictionary={dictionary} key={"StepFour"} />
      </Tab>
      <Tab currentTab={currentTab} handleClick={handleTab} index={"Rôle"}>
        <StepFiveCheckbox
          formik={formik}
          dictionary={dictionary}
          key={"StepFiveCheckBox"}
        />
      </Tab>
      <Tab
        currentTab={currentTab}
        handleClick={handleTab}
        index={"Photos & Vidéos"}
      >
        <StepSix
          formik={formik}
          dictionary={dictionary}
          isLoadInput={isLoadInput}
          setIsLoadInput={setIsLoadInput}
          open={open}
          toggle={toggle}
          inputs={mergedStepSix}
          isCurrentlyEditing={isCurrentlyEditing}
          setIsCurrentlyEditing={setIsCurrentlyEditing}
          key={"StepSix"}
        />
      </Tab>
    </section>
  );
};

export default ProfilLayout;
