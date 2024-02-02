import { InputString } from "@/app/[lang]/components/form/InputLabel";
import { Dictionary } from "@/types/dictionary";
import React from "react";

const StepTwo = ({
  dictionary,
  formik,
}: {
  dictionary: Dictionary;
  formik: any;
}) => {
  return (
    <div>
      {" "}
      <InputString
        id={"email"}
        formik={formik}
        label={dictionary.contact.label.email}
        placeholder="Doe@gmail.com"
        requis={true}
      />
    </div>
  );
};

export default StepTwo;
