"use client";
import useToggle from "@/hooks/Basic/useToggle";
import useFormSubmission from "@/hooks/Formulaire/useFormSubmission";
import useServeInitialValueProfil from "@/hooks/Formulaire/useServeInitialValueProfil";
import { updateProfil } from "@/services/formulaire/profil";
import { Dictionary } from "@/types/dictionary";
import { sendToast } from "@/utils/toast";
import { SchemaValidationProfil } from "@/utils/validationProfil";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import TabsLayout from "./TabsLayout";
import SingleCandidatLayout from "../../choix/genre/[gender]/[id]/SingleCandidatLayout";
import { AiFillCloseCircle } from "react-icons/ai";
import Spinner from "../../components/Spinner";

export const excludeField = [
  "email",
  "password",
  "nomDeNaissance",
  "firstname",
  "gender",
  "autresphotos",
  "marital",
];

const ProfilLayout = ({
  dictionary,
  candidat,
  getCandidatPreview,
  castings,
}: {
  dictionary: Dictionary;
  candidat: any;
  getCandidatPreview: (id: string) => void;
  castings: any;
}) => {
  const { profilInitialValues } = useServeInitialValueProfil(candidat);
  const [currentTab, setCurrentTab] = useState<number | null>(null);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState("");
  const [previewCandidat, setPreviewCandidat] = useState(null);
  const { toggle, open } = useToggle();
  const { open: openPreview, toggle: togglePreview } = useToggle();
  const { data: session } = useSession();
  //@ts-ignore
  const jwt = session?.user?.jwt;
  const {
    isSubmitting,
    isLoadInput,
    setIsLoadInput,
    startSubmission,
    finishSubmission,
  } = useFormSubmission();

  const mergedStepSix = {
    ...dictionary?.inscription?.stepFive?.default,
    ...dictionary?.inscription?.stepSix?.default,
    ...dictionary?.inscription?.stepSix?.content,
  };

  const formik = useFormik({
    initialValues: profilInitialValues,
    validationSchema: SchemaValidationProfil,
    onSubmit: async (values) => {
      startSubmission();
      const response = await updateProfil(
        values,
        //@ts-ignore
        session?.user?.jwt,
        candidat?.id
      );
      if (response?.status === 200) {
        sendToast(false, dictionary?.general?.success);
        finishSubmission("");
      } else {
        if (response?.response?.data?.error?.message) {
          sendToast(true, response?.response?.data?.error?.message);
          finishSubmission("");
        } else {
          sendToast(true, "An error occurred");
          finishSubmission("");
        }
      }
    },
  });

  const handleTab = (tab: number | null) => {
    if (currentTab === tab) {
      setCurrentTab(null);
    } else {
      setCurrentTab(tab);
    }
  };
  const handleCandidatPreview = async (id: string) => {
    try {
      const response = await getCandidatPreview(id);
      //@ts-ignore
      if (response?.error) {
        //@ts-ignore
        sendToast(true, response?.error?.message || "An error occurred");
      } else {
        //@ts-ignore
        setPreviewCandidat(response);
        sendToast(false, "Data load");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(castings, "CASTING");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    (() => formik.validateForm())();
  }, []);

  return (
    <>
      <section className="flex flex-col w-full items-center justify-center ">
        <div className="text-center italic my-3 mx-auto flex flex-col gap-2 w-full p-1 max-w-[700px]">
          {dictionary?.general?.profil?.map((text: string, index: number) => {
            return <p key={index}>{text}</p>;
          })}
        </div>
        <button
          className="boutonSlideCommon shrink-0 text-lg max-w-[190px] w-full radius p-2.5 border-[1px] border-white"
          onClick={() => {
            handleCandidatPreview(candidat?.id);
            togglePreview();
          }}
        >
          {dictionary?.general?.previewProfil}
        </button>
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
          jwt={jwt}
          candidatId={candidat?.id}
        />
      </section>
      {openPreview && previewCandidat !== null && (
        <section className="absolute top-0 left-0 z-50 bg-black w-full  min-h-screnn h-full md:flex items-center justify-center ">
          <Suspense fallback={<Spinner />}>
            <AiFillCloseCircle
              className="z-50 absolute right-6 top-6 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
              onClick={togglePreview}
            />
            <SingleCandidatLayout
              candidat={previewCandidat}
              dictionary={dictionary}
            />
          </Suspense>
        </section>
      )}

      <section className="w-full h-fit max-w-[730px] mt-6">
        <h2 className="text-2xl font-bold mb-4">Casting</h2>
        <section className="w-full h-full flex flex-wrap gap-4 ">
          {castings &&
            castings.length > 0 &&
            castings.map((casting: any) => {
              return (
                <div
                  className="flex flex-col gap-4 border-[1px] border-white w-full h-fit p-5 radius max-w-[230px] grow shrink-0"
                  key={casting?.id}
                >
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {casting?.attributes?.Titre}
                    </h2>
                  </div>
                  {casting?.attributes?.Informations?.length > 0 &&
                    casting?.attributes?.Informations?.map((infos: any) => {
                      const dateString = infos?.Date_Casting;
                      const formattedDate = dateString
                        .split("-")
                        .reverse()
                        .join("/");
                      return (
                        <React.Fragment key={infos?.id}>
                          <div className="flex gap-2 items-center">
                            <span className="italic text-sm opacity-55">
                              {casting?.attributes?.Lieu}
                            </span>
                            <span className="italic text-sm opacity-55">-</span>
                            <span className="italic text-sm opacity-55">
                              {formattedDate}
                            </span>
                          </div>

                          <div className="w-full flex flex-wrap gap-2 justify-center">
                            <button className="boutonSlideCommon radius w-44 p-2">
                              {infos?.Disponible}
                            </button>
                            <button className="boutonSlideCommon radius w-44 p-2">
                              {infos?.Indisponible}
                            </button>
                          </div>
                        </React.Fragment>
                      );
                    })}
                </div>
              );
            })}
        </section>
      </section>
    </>
  );
};

export default ProfilLayout;
