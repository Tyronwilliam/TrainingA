import { useState } from "react";
import Spinner from "../Spinner";
import { ErrorInput, Label } from "./InputLabel";
import {
  checkError,
  handleMultipleFileChange,
  handleSingleFileChange,
} from "./function";
import { InputPhotoProps } from "./type";

const InputPhoto = ({
  id,
  formik,
  label,
  requis,
  helper,
  limit,
  accept,
  multiple,
  isLoadInput,
  setIsLoadInput,
  dictionary,
}: InputPhotoProps) => {
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState("");
  const errorText = checkError(formik, id);
  const value = formik.values[id];
  const length = Array.isArray(value) ? value.length : value !== "" ? 1 : 0;
  const handlePicture = Array.isArray(value) && value.length > 0;
  const isDisabled = isLoadInput;
  const displaySpinner = isLoadInput && isCurrentlyEditing === id;
  const maxPhotoError = dictionary?.general?.form?.errors?.autresphotos;
  const helperPhoto = dictionary?.general?.form?.helpers?.autresphotos;

  console.log(formik?.values?.photodepresentation, "FORMIK");
  return (
    <div className="box__input box__photo" data-testid="input">
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={value}
        limit={limit}
        length={length}
      />{" "}
      {id === "autresphotos" && (
        <p className="text-sm underline">{helperPhoto}</p>
      )}
      {displaySpinner && <Spinner />}
      <input
        data-testid="input__value"
        type="file"
        accept={accept}
        id={id}
        name={id}
        disabled={isDisabled}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (setIsLoadInput) {
            if (multiple) {
              handleMultipleFileChange(
                event,
                formik,
                setIsLoadInput,
                maxPhotoError,
                id
              );
            } else {
              handleSingleFileChange(event, formik, setIsLoadInput, "", id);
            }
          }
        }}
        onBlur={formik.handleBlur}
        multiple={multiple}
        onClick={(event) => {
          setIsCurrentlyEditing(id);
          const inputElement = event.target as HTMLInputElement;
          inputElement.value = "";
        }}
      />
      {/* Button to view Photo  */}
      {multiple && handlePicture && (
        <button type="button" className="boutonSlideCommon">
          Gerer photos
        </button>
      )}
      {/* <>
        {Array.isArray(value) &&
          value?.map((i, index) => {
            console.log(i);
            return;
          })}
      </> */}
      {helper && <p className="text-sm italic ">{`(${helper})`}</p>}
      {/* BUTTON pour envoyer photo multiple */}
      {multiple && (
        <button type="button" className="boutonSlideCommon">
          SEND MULTIPLE
        </button>
      )}
      <ErrorInput errorText={errorText} />
    </div>
  );
};

export default InputPhoto;
