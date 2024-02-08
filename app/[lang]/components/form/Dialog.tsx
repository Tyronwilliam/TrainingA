import { FormikProps } from "formik";
import { FileName } from "./FileName";
import { IoCloseCircleSharp } from "react-icons/io5";

type DialogProps = {
  open: boolean;
  value: any[];
  toggle: () => void;
  formik: FormikProps<any>;
  id: string;
  jwt: string;
  isCurrentlyEditing: string | undefined;
};
export const Dialog = ({
  open,
  value,
  toggle,
  formik,
  id,
  jwt,
  isCurrentlyEditing,
}: DialogProps) => {
  const isOpen = open && isCurrentlyEditing === id;
  return (
    Array.isArray(value) && (
      <dialog open={isOpen} className="dialog__portfolio">
        <button
          aria-label="delete"
          type="button"
          onClick={toggle}
          className="w-5 h-5 absolute right-2 top-2 z-50 cursor-pointer "
        >
          <IoCloseCircleSharp className="w-full h-full hover:fill-gray-500" />
        </button>
        <div className="flex flex-col gap-1 mb-5">
          {value?.map((i, index) => {
            return (
              <FileName
                key={index}
                file={i}
                value={value}
                formik={formik}
                id={id}
                jwt={jwt}
              />
            );
          })}
        </div>
      </dialog>
    )
  );
};
