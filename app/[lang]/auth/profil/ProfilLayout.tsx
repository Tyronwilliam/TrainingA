"use client";
import useToggle from "@/hooks/Basic/useToggle";
import useFormSubmission from "@/hooks/Formulaire/useFormSubmission";
import { Dictionary } from "@/types/dictionary";
import {
  StepFiveSchema,
  StepFourSchema,
  baseStepOneSchema,
  StepSixSchema,
  StepThreeSchema,
  StepTwoSchema,
  inscriptionInitialValues,
  SchemaRole,
} from "@/utils/validationInscription";
import { useFormik } from "formik";
import { useState } from "react";
import TabsLayout from "./TabsLayout";
import { SchemaPhotoVideoProfil, profilInitialValues } from "@/utils/validationProfil";

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
    baseStepOneSchema,
    StepTwoSchema,
    StepThreeSchema,
    StepFourSchema,
    SchemaRole,
    SchemaPhotoVideoProfil,
  ];
  const formik = useFormik({
    initialValues: profilInitialValues,
    validationSchema: validationSchema[currentStep],
    onSubmit: async (values) => {},
    //   handleSubmit(values, startSubmission, finishSubmission, executeRecaptcha),
  });

  const handleTab = (tab: string | null) => {
    if (currentTab === tab) {
      setCurrentTab(null);
    } else {
      setCurrentTab(tab);
    }
  };

  return (
    <section className="flex flex-col w-full items-center justify-center ">
      <TabsLayout
        currentTab={currentTab}
        handleClick={handleTab}
        dictionary={dictionary}
        formik={formik}
        excludeField={excludeField}
        isLoadInput={isLoadInput}
        setIsLoadInput={setIsLoadInput}
        open={open}
        toggle={toggle}
        setIsCurrentlyEditing={setIsCurrentlyEditing}
        isCurrentlyEditing={isCurrentlyEditing}
        mergedStepSix={mergedStepSix}
      />
    </section>
  );
};

export default ProfilLayout;
