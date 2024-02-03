import { ErrorInput, Label } from "./InputLabel";
import { checkError } from "./function";
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
}: InputPhotoProps) => {
  const errorText = checkError(formik, id);
  const value = formik.values[id];
  const length = Array.isArray(value) ? value.length : value !== "" ? 1 : 0;
  return (
    <div className="box__input box__photo" data-testid="input">
      <Label
        requis={requis}
        label={label}
        errorText={errorText}
        value={value}
        limit={limit}
        length={length}
      />
      {/* Ajouter nombre de photo */}
      <input
        data-testid="input__value"
        type="file"
        accept={accept}
        id={id}
        name={id}
        onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFiles: FileList | null = event?.currentTarget?.files;
          const arrayFile: File[] = [...formik?.values?.autresphotos];
          if (selectedFiles) {
            const arrayOfObjects = Object.values(selectedFiles);

            console.log(arrayOfObjects, "Converted Object to array");
            // Object.entries(selectedFiles).forEach(function ([key, value]: any) {
            //   console.log(key, "check", value);
            //   arrayFile.push(...formik.values.autresphotos, value);
            // });
            // arrayFile.push(...formik.values.autresphotos, selectedFiles[0]);
            const filterNonFileObjects = arrayOfObjects?.filter(
              (file: File) => file instanceof File
            );
            if (filterNonFileObjects?.length > 3) {
              console.log("TROP DE PHOTO D4UN COUP");
            } else {
              filterNonFileObjects.forEach((object) => {
                arrayFile.push(object);
              });
            }
            console.log(filterNonFileObjects, "NON FILE");
            // const allFile = selectedFiles?.length + nonFileObjects?.length;
            // if (allFile > 3) {
            //   //   setFileError("3 pictures per group");
            //   return (event.target.value = "");
            // } else if (selectedFiles && allFile <= 3) {
            //   //   setIsLoadTwo(true);
            //   const images = [];
            //   for (let i = 0; i < selectedFiles.length; i++) {
            //     const file = selectedFiles[i];
            //     if (file.type.startsWith("image/")) {
            //       //   const image = await resizeFile(file);
            //       images.push(file);
            //     } else {
            //       images.push(file);
            //     }
            //   }
            formik.setFieldValue(
              "autresphotos",
              arrayFile // ...images,
            );

            //   setIsLoadTwo(false);
          }
        }}
        onBlur={formik.handleBlur}
        multiple={multiple}
        onClick={(event) => {
          const inputElement = event.target as HTMLInputElement;
          inputElement.value = "";
        }}
      />
      {multiple && <button>Gerer photos</button>}
      {/* <>
        {Array.isArray(value) &&
          value?.map((i, index) => {
            console.log(i);
            return;
          })}
      </> */}
      {helper && <p className="text-sm italic ">{`(${helper})`}</p>}
      {/* Loading UI  */}
      {/* Button to view Photo  */}
      <ErrorInput errorText={errorText} />
    </div>
  );
};

export default InputPhoto;
