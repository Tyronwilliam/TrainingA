import useToggle from "@/hooks/Basic/useToggle";
import classNames from "classnames";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  checkError,
  handleKeyPress,
  handleWheel,
  limitInputNumber,
} from "./function";
import {
  ErrorInputProps,
  InputLabelProps,
  InputLabelPropsWithCustomClass,
  InputLabelPropsWithLimit,
  InputPasswordPropsWithShow,
  InputSelectPropsWithOptions,
  LabelProps,
} from "./type";

export const InputString = ({
  id,
  formik,
  label,
  placeholder,
  requis,
  type,
  helpers,
}: InputLabelProps) => {
  const errorText = checkError(formik, id);
  const value = formik.values[id];
  return (
    <div className="box__input" data-testid="input">
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={value}
      />
      <input
        data-testid="input__value"
        type={`${
          type === "email" ? "email" : type === "date" ? "date" : "text"
        }`}
        id={id}
        name={id}
        onChange={formik.handleChange}
        value={value}
        onBlur={formik.handleBlur}
        placeholder={placeholder !== undefined ? placeholder : ""}
      />
      <p>{helpers}</p>
      <ErrorInput errorText={errorText} />
    </div>
  );
};

export const InputPassword = ({
  id,
  formik,
  label,
  requis,
}: InputPasswordPropsWithShow) => {
  const { toggle, open } = useToggle();
  const value = formik.values[id];
  const errorText = checkError(formik, id);

  return (
    <div className="box__input" data-testid="input">
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={value}
      />
      <div className="flex items-center w-full relative">
        <input
          className="grow "
          data-testid="input__value"
          type={`${open ? "text" : "password"}`}
          id={id}
          name={id}
          onChange={formik.handleChange}
          value={value}
          onBlur={formik.handleBlur}
        />
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

export const TextArea = ({
  id,
  formik,
  label,
  classStyle,
  requis,
}: InputLabelPropsWithCustomClass) => {
  const errorText = checkError(formik, id);
  const value = formik.values[id];

  return (
    <div className={`box__input ${classStyle}`} data-testid="textArea">
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={value}
      />
      <textarea
        id={id}
        name={id}
        onChange={formik.handleChange}
        value={value}
        onBlur={formik.handleBlur}
        rows={4}
      ></textarea>
      <ErrorInput errorText={errorText} />
    </div>
  );
};

export const InputNumber = ({
  id,
  formik,
  label,
  limitNumber,
  placeholder,
  requis,
}: InputLabelPropsWithLimit) => {
  const isNull = formik.values[id] === undefined ? null : formik.values[id];
  const errorText = checkError(formik, id);
  const value = formik.values[id] || "";

  return (
    <div className="box__input" data-testid="input_number">
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={isNull}
      />
      <input
        type="number"
        id={id}
        name={id}
        onChange={(e) => limitInputNumber(e, limitNumber, formik, id)}
        value={value}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        onKeyUp={handleKeyPress}
        onWheel={handleWheel}
      />
      <ErrorInput errorText={errorText} />
    </div>
  );
};

export const InputCheckBox = ({
  id,
  formik,
  label,
  requis,
}: InputLabelPropsWithCustomClass) => {
  const errorText = checkError(formik, id);
  const value = formik.values[id];

  return (
    <div className="box__input" data-testid="input">
      <input
        type={"checkbox"}
        id={id}
        name={id}
        onChange={formik.handleChange}
        value={value}
        onBlur={formik.handleBlur}
      />
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={value}
      />
      <ErrorInput errorText={errorText} />
    </div>
  );
};

export const InputSelect = ({
  id,
  formik,
  label,
  requis,
  options,
  dictionary,
}: InputSelectPropsWithOptions) => {
  const errorText = checkError(formik, id);
  const value = formik.values[id];

  return (
    <div className="box__input">
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={value}
      />
      <select
        name={id}
        id={id}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={value}
      >
        <option value="">{dictionary?.general?.form?.select}</option>
        {options &&
          Object?.entries(options).map(([key, value]) => {
            return (
              <option value={key} key={key}>
                {value}
              </option>
            );
          })}
      </select>
      <ErrorInput errorText={errorText} />
    </div>
  );
};

export const ErrorInput = ({ errorText }: ErrorInputProps) => {
  return errorText ? (
    <div className="text-red-500">
      <p>{errorText}</p>
    </div>
  ) : (
    ""
  );
};

const Label = ({ label, requis, errorText, value }: LabelProps) => {
  return (
    <label>
      {label}:
      {requis && (
        <span
          className={classNames({
            "text-red-500": errorText || value === "" || value === null,
          })}
        >
          *
        </span>
      )}
    </label>
  );
};
