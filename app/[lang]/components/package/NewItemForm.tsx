import React, { FormEvent } from "react";
import { CgFolderAdd } from "react-icons/cg";
import { MdEdit, MdEditOff } from "react-icons/md";

// const NewPackage = ({
//   openInput,
//   toggleInput,
//   handleInputChange,
//   packName,
//   useCreatePackage,
// }: {
//   openInput: boolean;
//   toggleInput: () => void;
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   packName: string;
//   useCreatePackage: () => void;
// }) => {
//   return openInput ? (
//     <form
//       onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         useCreatePackage();
//         toggleInput();
//       }}
//     >
//       <div className="flex flex-col mb-2">
//         <label htmlFor="name">Nom:*</label>
//         <input
//           type="text"
//           id="name"
//           placeholder="Ex: Acteur Casting Plage"
//           className="max-w-52"
//           onChange={(e) => handleInputChange(e)}
//           value={packName}
//         />
//       </div>
//       <button type="submit" className="boutonSlideCommon p-2 radius">
//         Créer
//       </button>
//     </form>
//   ) : (
//     <div className="flex items-center gap-2 text-lg h-fit">
//       <CgFolderAdd className="w-6 h-6" />
//       <button type="button" className="hover:underline" onClick={toggleInput}>
//         Créer un package
//       </button>
//     </div>
//   );
// };

// export default NewPackage;
interface NewItemFormProps<T> {
  isOpen: boolean;
  toggle: () => void;
  handleInputChange: () => void;
  itemValue: T;
  onSubmit: () => void;
  buttonText: string;
  label: string;
  placeholder: string;
  isUpdate: boolean;
}

const NewItemForm = <T,>({
  isOpen,
  toggle,
  handleInputChange,
  itemValue,
  onSubmit,
  buttonText,
  label,
  placeholder,
  isUpdate,
}: NewItemFormProps<T>) => {
  return isOpen ? (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
        toggle();
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col mb-2">
        {label && <label htmlFor="name">{label}:</label>}
        <input
          type="text"
          id="name"
          placeholder={placeholder}
          className="max-w-52 placeholder:text-gray-500"
          onChange={handleInputChange}
          value={itemValue as any}
        />
      </div>
      <div className="flex items-center gap-2">
        <button type="submit" className="boutonSlideCommon p-2 radius">
          {isUpdate ? "Mettre à jour" : "Créer"}
        </button>
        <button onClick={toggle} type="button">
          <MdEditOff className="w-5 h-5 hover:opacity-55" />
        </button>
      </div>
    </form>
  ) : (
    <>
      {isUpdate ? (
        <div
          className="flex gap-1 items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <p>{buttonText}</p>
          <button onClick={toggle}>
            <MdEdit />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-lg h-fit">
          <CgFolderAdd className="w-6 h-6" />
          {/* @ts-ignore */}
          <button type="button" className="hover:underline" onClick={toggle}>
            Créer un package
          </button>
        </div>
      )}
    </>
  );
};

export default NewItemForm;
