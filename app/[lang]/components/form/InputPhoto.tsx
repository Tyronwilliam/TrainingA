import useToggle from "@/hooks/Basic/useToggle";
import { useState } from "react";
import Spinner from "../Spinner";
import { Dialog } from "./Dialog";
import { ErrorInput, Label } from "./InputLabel";
import {
  checkError,
  handleFileChange,
  handleMultipleFileChange,
  handlePutPortfolioPhoto,
  handleSingleFileChange,
} from "./function";
import { InputPhotoProps, PortfolioButtonsProps } from "./type";
import { PortfolioButtons } from "./PortfolioButtons";

// PASSER LE JWT EN PROPS

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
  const { toggle, open } = useToggle();
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState("");
  const errorText = checkError(formik, id);
  const value = formik.values[id];
  const length = Array.isArray(value) ? value.length : value !== "" ? 1 : 0;
  const pictureLenght = Array.isArray(value) && value.length > 0;
  const isDisabled = isLoadInput;
  const displaySpinner = isLoadInput && isCurrentlyEditing === id;
  const maxPhotoError = dictionary?.general?.form?.errors?.autresphotos;
  const helperPhoto = dictionary?.general?.form?.helpers?.autresphotos;

  console.log(formik?.values, "FORMIK");
  return (
    <div className="box__input box__photo relative" data-testid="input">
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
            handleFileChange({
              event,
              formik,
              setIsLoadInput,
              error: maxPhotoError,
              id,
              setIsCurrentlyEditing,
              multiple,
            });
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
      <PortfolioButtons
        multiple={multiple}
        pictureLength={pictureLenght}
        buttonText="Gérer Photos"
        handleButtonClick={toggle}
      />
      <Dialog
        open={open}
        value={value}
        toggle={toggle}
        formik={formik}
        id={id}
        jwt={"jwt"}
        buttonText="OPEN DIALOG"
      />
      {helper && <p className="text-sm italic ">{`(${helper})`}</p>}
      {/* BUTTON pour envoyer photo multiple */}
      <PortfolioButtons
        multiple={multiple}
        pictureLength={pictureLenght}
        buttonText=" SEND MULTIPLE"
        handleButtonClick={handlePutPortfolioPhoto}
        candidatId={183}
        jwt={"jwt"}
        value={formik?.values?.autresphotos}
        formik={formik}
      />
      <ErrorInput errorText={errorText} />
    </div>
  );
};

export default InputPhoto;
