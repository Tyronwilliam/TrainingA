import Spinner from "../Spinner";
import { Dialog } from "./Dialog";
import Helpers from "./Helpers";
import { ErrorInput, Label } from "./InputLabel";
import { PortfolioButtons } from "./PortfolioButtons";
import {
  checkError,
  handleFileChange,
  handlePutPortfolioPhoto,
} from "./function";
import { InputPhotoProps } from "./type";

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
  isCurrentlyEditing,
  setIsCurrentlyEditing,
  open,
  toggle,
}: InputPhotoProps) => {
  const errorText = checkError(formik, id);
  const value = formik.values[id];
  const length = Array.isArray(value) ? value.length : value !== null ? 1 : 0;
  const pictureLenght = Array.isArray(value) && value.length > 0;
  const isDisabled = isLoadInput && isCurrentlyEditing === id;
  const maxPhotoError = dictionary?.general?.form?.errors?.autresphotos;
  const helperPhoto = dictionary?.general?.form?.helpers?.autresphotos;
  const tooMuchInstanceFile = Array.isArray(value)
    ? value.filter((item: any) => item instanceof File).length >= 3
    : false;
  const noInstanceFile = Array.isArray(value)
    ? !value.some((item: any) => item instanceof File)
    : false;
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
        <Helpers classStyle="text-sm underline" helper={helperPhoto} />
      )}
      {isDisabled && <Spinner />}
      <input
        data-testid="input__value"
        type="file"
        accept={accept}
        id={id}
        name={id}
        disabled={isDisabled || tooMuchInstanceFile}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (setIsLoadInput) {
            handleFileChange({
              event,
              formik,
              setIsLoadInput,
              error: maxPhotoError,
              id,
              multiple,
            });
          }
        }}
        onBlur={formik.handleBlur}
        multiple={multiple}
        onClick={(event) => {
          const inputElement = event.target as HTMLInputElement;
          inputElement.value = "";
          setIsCurrentlyEditing && setIsCurrentlyEditing(id);
        }}
      />
      <PortfolioButtons
        multiple={multiple}
        pictureLength={pictureLenght}
        buttonText="Gérer Photos"
        handleButtonClick={toggle!}
      />
      <Dialog
        open={open!}
        value={value}
        toggle={toggle!}
        formik={formik}
        id={id}
        jwt={"jwt"}
      />
      {helper && <Helpers classStyle="text-sm italic" helper={helper} />}
      <PortfolioButtons
        multiple={multiple}
        pictureLength={pictureLenght}
        buttonText=" SEND MULTIPLE"
        handleButtonClick={handlePutPortfolioPhoto}
        candidatId={183}
        jwt={"jwt"}
        value={formik?.values[id]}
        formik={formik}
        isDisabled={isDisabled}
        setIsLoadInput={setIsLoadInput}
        errorText={errorText}
        noInstanceFile={noInstanceFile}
        id={id}
      />
      <ErrorInput errorText={errorText} />
    </div>
  );
};

export default InputPhoto;
