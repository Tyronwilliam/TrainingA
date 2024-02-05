import {
  ErrorInput,
  InputNumber,
  InputString,
  TextArea,
} from "@/app/[lang]/components/form/InputLabel";
import { Dictionary } from "@/types/dictionary";
import { FormikContactProps } from "@/types/formulaire";
import { FormikProps } from "formik";
import ButtonForm from "../components/ButtonForm";

export interface ContactFormProps {
  formik: FormikProps<FormikContactProps>;
  dictionary: Dictionary;
  isSubmitting: boolean;
  submitError: string;
}
const ContactForm = ({
  formik,
  dictionary,
  submitError,
  isSubmitting,
}: ContactFormProps) => {
  const keys = dictionary && Object.keys(dictionary.contact.label);

  return (
    <form
      data-testid="form"
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center justify-center w-full max-w-[730px] mt-7 m-auto md:flex-row md:flex-wrap gap-6"
    >
      <InputString
        id={keys[0]}
        formik={formik}
        label={dictionary.contact.label.lastname}
        placeholder="Doe"
        requis={true}
      />
      <InputString
        id={keys[1]}
        formik={formik}
        label={dictionary.contact.label.firstname}
        placeholder="John"
        requis={true}
      />
      <InputString
        id={keys[2]}
        formik={formik}
        label={dictionary.contact.label.email}
        placeholder="JohnDoe@exemple.com"
        requis={true}
      />{" "}
      <InputNumber
        id={keys[3]}
        formik={formik}
        label={dictionary.contact.label.phone}
        limitNumber={10}
        placeholder="0785254463"
        requis={true}
      />
      <InputString
        id={keys[4]}
        formik={formik}
        label={dictionary.contact.label.companyName}
        placeholder="JohnDoe Agency"
        requis={true}
      />
      <InputString
        id={keys[5]}
        formik={formik}
        label={dictionary.contact.label.subject}
        placeholder="Casting Plage"
        requis={true}
      />
      <TextArea
        id={keys[6]}
        formik={formik}
        label={dictionary.contact.label.message}
        classStyle="grow md:basis-full md:max-w-[588px] sm:h-44"
        requis={true}
        placeholder=""
      />
      <ButtonForm
        dictionary={dictionary}
        formik={formik}
        isSubmitting={isSubmitting}
        content={dictionary.cta.formEvent.send}
        type="submit"
      />
      <ErrorInput errorText={submitError} />
    </form>
  );
};

export default ContactForm;
