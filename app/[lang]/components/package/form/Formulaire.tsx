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
import { generateContract } from "@/hooks/Contract/function";
import { useSession } from "next-auth/react";
import { PackSchema } from "@/types/package";

const Formulaire = ({
  dictionary,
  currentPack,
}: {
  dictionary: Dictionary;
  currentPack: PackSchema;
}) => {
  const { isSubmitting, startSubmission, finishSubmission } =
    useFormSubmission();
  const { data: session } = useSession();

  const formik = useFormik({
    initialValues: contractInitialValues,
    validationSchema: contractSchema,
    onSubmit: async (values) => {
      startSubmission();
      await generateContract(
        currentPack,
        values,
        //@ts-ignore
        session?.user?.jwt
      );
      finishSubmission();
    },
  });
  const inputs = dictionary?.genre?.page?.package?.contract;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      className="flex flex-col flex-wrap justify-center  items-center h-full  w-full max-w-[700px] mt-7 m-auto mb-10 md:flex-row md:flex-wrap gap-5  "
    >
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
