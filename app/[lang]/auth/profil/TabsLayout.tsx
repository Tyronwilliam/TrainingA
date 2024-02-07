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
import ButtonForm from "../../components/ButtonForm";

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
  isSubmitting,
}: {
  currentTab: number | null;
  handleClick: (arg: number) => void;
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
  isSubmitting: boolean;
}) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={
        "px-2 sm:px-0 flex  flex-col justify-center  max-w-[700px] m-auto"
      }
    >
      {" "}
      <Tab
        currentTab={currentTab}
        handleClick={handleClick}
        index={0}
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
        index={1}
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
        index={2}
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
        index={3}
      >
        <StepFour formik={formik} dictionary={dictionary} key={"StepFour"} />
      </Tab>
      <Tab
        currentTab={currentTab}
        handleClick={handleClick}
        index={4}
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
        index={5}
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
      <ButtonForm
        isSubmitting={isSubmitting}
        formik={formik}
        dictionary={dictionary}
        content={"SUBMIT"}
        type="submit"
        handleClick={() => {}}
      />{" "}
    </form>
  );
};

export default TabsLayout;
