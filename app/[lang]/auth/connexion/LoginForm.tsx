"use client";
import { InputPassword, InputString } from "@/app/InputLabel";
import { Dictionary } from "@/types/dictionary";
import {
  ConnexionSchema,
  initialValuesConnexion,
} from "@/utils/validationConnexion";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";

const LoginForm = ({ dictionary }: { dictionary: Dictionary }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };
  const formik = useFormik({
    initialValues: initialValuesConnexion,
    validationSchema: ConnexionSchema,
    onSubmit: async (values) => {},
  });
  return (
    <form className="flex flex-col items-center justify-center w-full h-fit max-w-[730px] mt-7  gap-6">
      <InputString
        id={"email"}
        formik={formik}
        label={dictionary.contact.label.email}
        placeholder="JohnDoe@exemple.com"
      />{" "}
      <InputPassword
        id={"password"}
        formik={formik}
        label={dictionary.general.form.password}
        show={show}
        toggleShow={toggleShow}
      />{" "}
      <Link href={"/"} className="text-lg">
        <li>{dictionary?.connexion?.passwordForgot}</li>
      </Link>
      <button className="boutonSlideCommon p-2 radius">
        {dictionary?.cta?.formEvent?.connexion}
      </button>
    </form>
  );
};

export default LoginForm;
