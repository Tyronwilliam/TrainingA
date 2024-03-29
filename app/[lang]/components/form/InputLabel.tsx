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
import Helpers from "./Helpers";
import { ChangeEvent } from "react";

export const InputString = ({
  id,
  formik,
  label,
  placeholder,
  requis,
  type,
  helper,
  pattern,
  limit,
}: InputLabelProps) => {
  const errorText = checkError(formik, id);
  const value = formik.values[id] !== null ? formik.values[id] : "";
  const pattenProps = pattern && pattern;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (pattern && limit) {
      return limitInputNumber({ event, limit, formik, id });
    }
    formik?.handleChange(event);
  };
  return (
    <div className="box__input" data-cy="input">
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
        onChange={handleChange}
        value={value}
        onBlur={formik.handleBlur}
        placeholder={placeholder !== undefined ? placeholder : ""}
        pattern={pattenProps}
        maxLength={limit}
      />
      {helper && <Helpers classStyle="text-sm italic" helper={helper} />}
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
    <div className="box__input" data-cy="input">
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
      {helper && <Helpers classStyle="text-sm italic" helper={helper} />}
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
    <div className={`box__input ${classStyle}`} data-cy="input">
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
      {helper && <Helpers classStyle="text-sm italic" helper={helper} />}
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
    <div className="box__input" data-cy="input">
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
        onChange={(event) => limitInputNumber({ event, limit, formik, id })}
        value={value}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        onKeyUp={handleKeyPress}
        onWheel={handleWheel}
      />{" "}
      {helper && <Helpers classStyle="text-sm italic" helper={helper} />}
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
    "box__checkbox self__unset": true,
    "shrink-0 grow ": id !== "agence",
    "md:self-baseline": id === "agence" || id === "retired",
  });
  return (
    <div className={specificTarget} data-cy="input">
      <div className="w-full flex gap-2">
        <input
          type={"checkbox"}
          id={id}
          name={id}
          onChange={formik.handleChange}
          value={value}
          checked={value}
          onBlur={formik.handleBlur}
        />
        <Label
          requis={requis}
          label={label}
          errorText={errorText}
          value={value}
          isCheckbox={true}
        />{" "}
      </div>
      {helper && <Helpers classStyle="text-sm italic" helper={helper} />}
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
    <div className="box__input" data-cy="input">
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
  isCheckbox,
}: LabelProps) => {
  return (
    <label>
      {isCheckbox ? `${label}` : `${label}:`}
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
