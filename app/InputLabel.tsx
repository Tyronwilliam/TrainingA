import useToggle from "@/hooks/Basic/useToggle";
import classNames from "classnames";
import { FormikProps } from "formik";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

type InputLabelProps = {
  id: string;
  formik: FormikProps<any>;
  label: string;
  placeholder: string;
  requis?: boolean;
};
export const InputString = ({
  id,
  formik,
  label,
  placeholder,
  requis,
}: InputLabelProps) => {
  const errorText =
    formik.errors && formik.touched[id] && formik.errors[id]
      ? formik.errors[id]?.toString()
      : "";

  return (
    <div className="box__input" data-testid="input">
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={`${formik.values[id]}`}
      />
      <input
        data-testid="input__value"
        type={`${id === "email" ? "email" : "string"}`}
        id={id}
        name={id}
        onChange={formik.handleChange}
        value={`${formik.values[id]}`}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
      />{" "}
      <ErrorInput errorText={errorText} />
    </div>
  );
};
type InputPasswordPropsWithShow = Omit<InputLabelProps, "placeholder">;

export const InputPassword = ({
  id,
  formik,
  label,
  requis,
}: InputPasswordPropsWithShow) => {
  const { toggle, open } = useToggle();

  const errorText =
    formik.errors && formik.touched[id] && formik.errors[id]
      ? formik.errors[id]?.toString()
      : "";

  return (
    <div className="box__input" data-testid="input">
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={`${formik.values[id]}`}
      />
      <div className="flex items-center w-full relative">
        <input
          className="grow "
          data-testid="input__value"
          type={`${open ? "text" : "password"}`}
          id={id}
          name={id}
          onChange={formik.handleChange}
          value={`${formik.values[id]}`}
          onBlur={formik.handleBlur}
        />{" "}
        {open ? (
          <FaEyeSlash
            onClick={toggle}
            className="cursor-pointer w-5 h-5  absolute right-0 z-50"
          />
        ) : (
          <FaEye
            onClick={toggle}
            className="cursor-pointer w-5 h-5  absolute right-0 z-50"
          />
        )}
      </div>
      <ErrorInput errorText={errorText} />
    </div>
  );
};
type InputLabelPropsWithCustomClass = Omit<InputLabelProps, "placeholder"> & {
  classStyle?: string;
};

export const TextArea = ({
  id,
  formik,
  label,
  classStyle,
  requis,
}: InputLabelPropsWithCustomClass) => {
  const errorText =
    formik.touched[id] && formik.errors[id]
      ? formik.errors[id]?.toString()
      : "";

  return (
    <div className={`box__input ${classStyle}`} data-testid="textArea">
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={`${formik.values[id]}`}
      />
      <textarea
        id={id}
        name={id}
        onChange={formik.handleChange}
        value={`${formik.values[id]}`}
        onBlur={formik.handleBlur}
        rows={4}
      ></textarea>
      <ErrorInput errorText={errorText} />
    </div>
  );
};

type InputLabelPropsWithLimit = InputLabelProps & {
  limitNumber: number;
};

export const InputNumber = ({
  id,
  formik,
  label,
  limitNumber,
  placeholder,
  requis,
}: InputLabelPropsWithLimit) => {
  const errorText =
    formik.touched[id] && formik.errors[id]
      ? formik.errors[id]?.toString()
      : "";

  return (
    <div className="box__input" data-testid="input_number">
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={`${formik.values[id]}`}
      />
      <input
        type="number"
        id={id}
        name={id}
        onChange={(event) => {
          const { value } = event.target;

          // Remove non-numeric characters and limit to 15 digits
          const cleanedValue = value.replace(/\D/g, "").slice(0, limitNumber);

          formik.setFieldValue(id, cleanedValue);
        }}
        value={`${formik.values[id]}`}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
      />{" "}
      <ErrorInput errorText={errorText} />
    </div>
  );
};
export const ErrorInput = ({
  errorText,
}: {
  errorText: string | undefined;
}) => {
  return errorText ? (
    <div className="text-red-500">
      <p>{errorText}</p>
    </div>
  ) : (
    ""
  );
};

const Label = ({
  label,
  requis,
  errorText,
  value,
}: {
  label: string;
  requis?: boolean;
  errorText: string | undefined;
  value: string | number | undefined;
}) => {
  return (
    <label>
      {label}:
      {requis && (
        <span
          className={classNames({
            "text-red-500": errorText || value === "",
          })}
        >
          *
        </span>
      )}{" "}
    </label>
  );
};
