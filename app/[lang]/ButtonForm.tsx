import { Dictionary } from "@/types/dictionary";
import classNames from "classnames";
import { FormikProps } from "formik";
import Spinner from "../Spinner";

interface ButtonFormProps {
  isSubmitting: boolean;
  formik: FormikProps<any>;
  dictionary: Dictionary;
  content: string;
}

const ButtonForm = ({
  isSubmitting,
  formik,
  dictionary,
  content,
}: ButtonFormProps) => {
  return (
    <button
      type="submit"
      className={classNames({
        "shrink-0 text-lg max-w-[120px] w-full radius p-2.5 border-[1px] border-white":
          true,
        boutonSlideCommon: formik.isValid && !isSubmitting,
        "opacity-50": !formik.isValid,
        "max-w-[180px] opacity-50": isSubmitting && formik.isValid,
      })}
      disabled={!formik.isValid || isSubmitting}
    >
      {isSubmitting ? (
        <div className="flex h-fit items-center justify-center">
          <Spinner />
          {dictionary.cta.formEvent.processing}
        </div>
      ) : (
        content
      )}
    </button>
  );
};

export default ButtonForm;
