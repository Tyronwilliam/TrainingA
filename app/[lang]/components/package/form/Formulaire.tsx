import { Dictionary } from "@/types/dictionary";
import {
  contractInitialValues,
  contractSchema,
} from "@/utils/validationPackage";
import { useFormik } from "formik";
import React from "react";
import Inputs from "../../form/Inputs";
import ButtonForm from "../../ButtonForm";
import useFormSubmission from "@/hooks/Formulaire/useFormSubmission";

const Formulaire = ({ dictionary }: { dictionary: Dictionary }) => {
  const { isSubmitting, startSubmission, finishSubmission } =
    useFormSubmission();
  const formik = useFormik({
    initialValues: contractInitialValues,
    validationSchema: contractSchema,
    onSubmit: async (values) => {},
  });
  const inputs = dictionary?.genre?.page?.package?.contract;
  return (
    <form className="flex flex-col flex-wrap justify-center h-full  w-full max-w-[700px] mt-7 m-auto mb-10 md:flex-row md:flex-wrap gap-6  ">
      <Inputs formik={formik} dictionary={dictionary} inputs={inputs} />
      <ButtonForm
        isSubmitting={isSubmitting}
        formik={formik}
        dictionary={dictionary}
        content={dictionary?.cta?.formEvent?.submit}
        type="submit"
        handleClick={() => {}}
      />{" "}
    </form>
  );
};

export default Formulaire;
