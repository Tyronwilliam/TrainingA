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
  helper,
}: InputLabelProps) => {
  const errorText = checkError(formik, id);
  const value = formik.values[id] !== null ? formik.values[id] : "";
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
      {helper && <p className="text-sm italic ">{`(${helper})`}</p>}
      <ErrorInput errorText={errorText} />
    </div>
  );
};

export const InputPassword = ({
  id,
  formik,
  label,
  requis,
  helper,
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
      </div>{" "}
      {helper && <p className="text-sm italic ">{`(${helper})`}</p>}
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
  helper,
  placeholder,
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
        placeholder={placeholder}
      ></textarea>{" "}
      {helper && <p className="text-sm italic">{`(${helper})`}</p>}
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
  helper,
}: InputLabelPropsWithLimit) => {
  const isNull = formik.values[id] === null ? null : formik.values[id];
  const errorText = checkError(formik, id);
  const value = formik.values[id] || "";
  const limit = limitNumber !== undefined ? limitNumber : 0;
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
        onChange={(e) => limitInputNumber(e, limit, formik, id)}
        value={value}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        onKeyUp={handleKeyPress}
        onWheel={handleWheel}
      />{" "}
      {helper && <p className="text-sm italic ">{`(${helper})`}</p>}
      <ErrorInput errorText={errorText} />
    </div>
  );
};

export const InputCheckBox = ({
  id,
  formik,
  label,
  requis,
  helper,
}: InputLabelPropsWithCustomClass) => {
  const errorText = checkError(formik, id);
  const value = formik.values[id];
  const specificTarget = classNames({
    "box__checkbox shrink-0 grow": id !== "agence",
    "box__checkbox self__unset md:self-baseline": id === "agence",
  });
  return (
    <div className={specificTarget} data-testid="input">
      <div className="w-full flex gap-2">
        <Label
          requis={requis}
          label={label}
          errorText={errorText}
          value={value}
        />{" "}
        <input
          type={"checkbox"}
          id={id}
          name={id}
          onChange={formik.handleChange}
          value={value}
          onBlur={formik.handleBlur}
        />
      </div>
      {helper && <p className="text-sm italic">{`(${helper})`}</p>}
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
  helper,
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

export const Label = ({
  label,
  requis,
  errorText,
  value,
  length,
  limit,
}: LabelProps) => {
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
      {length !== undefined && limit !== undefined && (
        <>
          <span
            className={classNames({
              "text-red-500 ml-2":
                errorText ||
                value === "" ||
                value === null ||
                length > limit ||
                length === 0,
            })}
          >
            {length}
          </span>
          <span>/{limit}</span>
        </>
      )}
    </label>
  );
};
