import React, { ReactNode } from "react";
import Tab from "./Tab";
import StepOne from "../../inscription/StepOne";
import { Dictionary } from "@/types/dictionary";
import StepTwo from "../../inscription/StepTwo";
import StepThree from "../../inscription/StepThree";
import StepFour from "../../inscription/StepFour";
import StepFiveCheckbox from "./StepFiveCheckbox";
import StepSix from "../../inscription/StepSix";
import { StepType } from "@/types/formulaire";

const TabsLayout = ({
  currentTab,
  handleClick,
  dictionary,
  formik,
  excludeField,
  isLoadInput,
  setIsLoadInput,
  open,
  toggle,
  setIsCurrentlyEditing,
  isCurrentlyEditing,
  mergedStepSix,
}: {
  currentTab: string | null;
  handleClick: (arg: string) => void;
  dictionary: Dictionary;
  formik: any;
  excludeField: string[];
  isLoadInput: boolean;
  setIsLoadInput: (isLoadInput: boolean) => void;
  open: boolean;
  toggle: () => void;
  isCurrentlyEditing: string;
  setIsCurrentlyEditing: (id: string) => void;
  candidatId?: number | "" | undefined;
  jwt?: string;
  mergedStepSix: Record<string, StepType>;
}) => {
  return (
    <>
      <Tab
        currentTab={currentTab}
        handleClick={handleClick}
        index={"Général"}
        title={dictionary?.profil[0]}
      >
        <StepOne
          formik={formik}
          dictionary={dictionary}
          key={"StepOne"}
          excludeField={excludeField}
        />
      </Tab>
      <Tab
        title={dictionary?.profil[1]}
        currentTab={currentTab}
        handleClick={handleClick}
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
        title={dictionary?.profil[2]}
        currentTab={currentTab}
        handleClick={handleClick}
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
        title={dictionary?.profil[3]}
        currentTab={currentTab}
        handleClick={handleClick}
        index={"Compétences"}
      >
        <StepFour formik={formik} dictionary={dictionary} key={"StepFour"} />
      </Tab>
      <Tab
        currentTab={currentTab}
        handleClick={handleClick}
        index={"Rôle"}
        title={dictionary?.profil[4]}
      >
        <StepFiveCheckbox
          formik={formik}
          dictionary={dictionary}
          key={"StepFiveCheckBox"}
        />
      </Tab>
      <Tab
        title={dictionary?.profil[5]}
        currentTab={currentTab}
        handleClick={handleClick}
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
    </>
  );
};

export default TabsLayout;
