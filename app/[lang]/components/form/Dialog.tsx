import { FormikProps } from "formik";
import { FileName } from "./FileName";

type DialogProps = {
  open: boolean;
  value: any[];
  toggle: () => void;
  formik: FormikProps<any>;
  id: string;
  jwt: string;
  buttonText: string;
};
export const Dialog = ({
  open,
  value,
  toggle,
  formik,
  id,
  jwt,
  buttonText,
}: DialogProps) => {
  return (
    <dialog open={open} className="dialog__portfolio">
      <div className="flex flex-col gap-1 mb-5">
        {Array.isArray(value) &&
          value?.map((i, index) => {
            return (
              <FileName
                file={i}
                value={value}
                formik={formik}
                id={id}
                jwt={jwt}
              />
            );
          })}
      </div>
      <button type="button" className="boutonSlideCommon" onClick={toggle}>
        {buttonText}
      </button>
    </dialog>
  );
};
