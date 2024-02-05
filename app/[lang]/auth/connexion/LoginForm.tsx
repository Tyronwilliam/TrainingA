"use client";
import {
  ErrorInput,
  InputPassword,
  InputString,
} from "@/app/[lang]/components/form/InputLabel";
import useCustomRouter from "@/hooks/Basic/useCustomRouter";
import useFormSubmission from "@/hooks/Formulaire/useFormSubmission";
import { Dictionary } from "@/types/dictionary";
import {
  ConnexionSchema,
  initialValuesConnexion,
} from "@/utils/validationConnexion";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonForm from "../../components/ButtonForm";
import { handleSubmission } from "./function";
import useToggle from "@/hooks/Basic/useToggle";

const LoginForm = ({ dictionary }: { dictionary: Dictionary }) => {
  const { isSubmitting, submitError, startSubmission, finishSubmission } =
    useFormSubmission();
  const { router } = useCustomRouter();
  const { toggle, open } = useToggle();
  const formik = useFormik({
    initialValues: initialValuesConnexion,
    validationSchema: ConnexionSchema,
    onSubmit: async (values) => {
      handleSubmission(startSubmission, values, finishSubmission, router);
    },
  });
  useEffect(() => {
    (() => formik.validateForm())();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      className="flex flex-col items-center justify-center w-full h-fit max-w-[730px] mt-7  gap-6"
    >
      <InputString
        id={"email"}
        formik={formik}
        label={dictionary.contact.label.email}
        placeholder="JohnDoe@exemple.com"
        requis={true}
      />{" "}
      <InputPassword
        requis={true}
        id={"password"}
        formik={formik}
        label={dictionary.general.form.password}
      />{" "}
      <ErrorInput errorText={submitError} />
      <Link href={`${dictionary?.connexion?.nav[0].link}`} className="text-lg">
        <li>{dictionary?.connexion?.nav[0].label}</li>
      </Link>
      <ButtonForm
        dictionary={dictionary}
        formik={formik}
        isSubmitting={isSubmitting}
        content={dictionary.cta.formEvent.connexion}
        type="submit"
      />
    </form>
  );
};

export default LoginForm;
