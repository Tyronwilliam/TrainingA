import {
  ErrorInput,
  InputNumber,
  InputString,
  TextArea,
} from "@/app/InputLabel";
import Spinner from "@/app/Spinner";
import { Dictionary } from "@/types/dictionary";
import { FormikContactProps } from "@/types/formulaire";
import classNames from "classnames";
import { FormikProps } from "formik";

interface ContactFormProps {
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
      />
      <InputString
        id={keys[1]}
        formik={formik}
        label={dictionary.contact.label.firstname}
        placeholder="John"
      />
      <InputString
        id={keys[2]}
        formik={formik}
        label={dictionary.contact.label.email}
        placeholder="JohnDoe@exemple.com"
      />{" "}
      <InputNumber
        id={keys[3]}
        formik={formik}
        label={dictionary.contact.label.phone}
        limitNumber={10}
        placeholder="0785254463"
      />
      <InputString
        id={keys[4]}
        formik={formik}
        label={dictionary.contact.label.companyName}
        placeholder="JohnDoe Agency"
      />
      <InputString
        id={keys[5]}
        formik={formik}
        label={dictionary.contact.label.subject}
        placeholder="Casting Plage"
      />
      <TextArea
        id={keys[6]}
        formik={formik}
        label={dictionary.contact.label.message}
        classStyle="grow md:basis-full md:max-w-[588px] sm:h-44"
      />
      <button
        type="submit"
        className={classNames({
          "boutonSlideCommon shrink-0 text-lg max-w-[120px] w-full radius p-2.5 ":
            formik.isValid && !isSubmitting,
          "border-white border-[1px] shrink-0 text-lg max-w-[120px] w-full radius	p-2.5 opacity-50":
            !formik.isValid,
          "border-white border-[1px] shrink-0 text-lg max-w-[180px] w-full radius	p-2.5 opacity-50":
            isSubmitting && formik.isValid,
        })}
        onClick={() => console.log("CLICK")}
        disabled={!formik.isValid || isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex h-fit items-center justify-center">
            <Spinner />
            {dictionary.cta.formEvent.processing}
          </div>
        ) : (
          dictionary.cta.formEvent.send
        )}
      </button>
      <ErrorInput errorText={submitError} />
    </form>
  );
};

export default ContactForm;
