import ButtonForm from "../../components/ButtonForm";
import { ErrorInput } from "../../components/form/InputLabel";
import StepFour from "../../inscription/StepFour";
import StepOne from "../../inscription/StepOne";
import StepSix from "../../inscription/StepSix";
import StepThree from "../../inscription/StepThree";
import StepTwo from "../../inscription/StepTwo";
import StepFiveCheckbox from "./StepFiveCheckbox";
import Tab from "./Tab";
import { TabsLayoutProps } from "./type";

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
}: TabsLayoutProps) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={
        "px-2 sm:px-0 flex  flex-col justify-center  max-w-[700px] m-auto "
      }
    >
      <Tab
        formik={formik}
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
        formik={formik}
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
        formik={formik}
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
        formik={formik}
        title={dictionary?.profil[3]}
        currentTab={currentTab}
        handleClick={handleClick}
        index={3}
      >
        <StepFour formik={formik} dictionary={dictionary} key={"StepFour"} />
      </Tab>
      <Tab
        formik={formik}
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
        formik={formik}
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
      {Object.keys(formik?.errors).length > 0 && (
        <div className="mx-auto mt-4">
          {Object.keys(formik.errors).map((key: string) => (
            <ErrorInput key={key} errorText={(formik.errors as any)[key]} />
          ))}
        </div>
      )}
      <div className="w-full text-center mt-4">
        <ButtonForm
          isSubmitting={isSubmitting}
          formik={formik}
          dictionary={dictionary}
          content={dictionary?.cta?.formEvent?.submit}
          type="submit"
          handleClick={() => {}}
        />
      </div>
    </form>
  );
};

export default TabsLayout;
