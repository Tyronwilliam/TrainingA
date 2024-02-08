import { Dictionary } from "@/types/dictionary";
import classNames from "classnames";
import { FormikProps } from "formik";
import Spinner from "./Spinner";

interface ButtonFormProps {
  isSubmitting: boolean;
  formik: FormikProps<any>;
  dictionary: Dictionary;
  content: string;
  handleClick?: () => void;
  type: "button" | "submit" | "reset" | undefined;
}

const ButtonForm = ({
  isSubmitting,
  formik,
  dictionary,
  content,
  type,
  handleClick,
}: ButtonFormProps) => {
  const isPreviousButton = content === "Précedent" || content === "Previous";
  const isValidAndNotSubmitting = formik.isValid && !isSubmitting;
  const isSubmittingAndNotValid = !formik.isValid || isSubmitting;
  const isDisabled = isPreviousButton ? false : isSubmittingAndNotValid;

  return (
    <button
      type={type}
      className={classNames({
        "shrink-0 text-lg max-w-[120px] w-full radius p-2.5 border-[1px] border-white":
          true,
        boutonSlideCommon: isValidAndNotSubmitting || isPreviousButton,
        "opacity-50": !formik.isValid && !isPreviousButton,
        "max-w-[180px] opacity-50": isSubmitting && formik.isValid,
      })}
      disabled={isDisabled || !formik.dirty}
      onClick={() => handleClick && handleClick()}
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
