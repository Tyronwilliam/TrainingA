"use client";
import useToggle from "@/hooks/Basic/useToggle";
import useFormSubmission from "@/hooks/Formulaire/useFormSubmission";
import { Dictionary } from "@/types/dictionary";
import {
  SchemaRole,
  StepFourSchema,
  StepThreeSchema,
  StepTwoSchema,
  baseStepOneSchema,
} from "@/utils/validationInscription";
import { SchemaPhotoVideoProfil } from "@/utils/validationProfil";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import TabsLayout from "./TabsLayout";
import useServeInitialValueProfil from "@/hooks/Formulaire/useServeInitialValueProfil";
import { updateProfil } from "@/services/formulaire/profil";
import { useSession } from "next-auth/react";

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
const ProfilLayout = ({
  dictionary,
  candidat,
}: {
  dictionary: Dictionary;
  candidat: any;
}) => {
  const { profilInitialValues } = useServeInitialValueProfil(candidat);
  const [currentTab, setCurrentTab] = useState<number | null>(null);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState("");
  const { toggle, open } = useToggle();
  const { data: session } = useSession();

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
    validationSchema: currentTab !== null ? validationSchema[currentTab] : "",
    onSubmit: async (values) => {
      const response = await updateProfil(
        values,
        //@ts-ignore
        session?.user?.jwt,
        candidat?.id
      );
      console.log(response, "MA REPONSE FROM SUBMIT");
    },
    //   handleSubmit(values, startSubmission, finishSubmission, executeRecaptcha),
  });

  const handleTab = (tab: number | null) => {
    if (currentTab === tab) {
      setCurrentTab(null);
    } else {
      setCurrentTab(tab);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    (() => formik.validateForm())();
  }, []);
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
        isSubmitting={isSubmitting}
      />
    </section>
  );
};

export default ProfilLayout;
