import { FormikProps } from "formik";
import { deleteFile } from "./function";
import { BsFillTrashFill } from "react-icons/bs";

type FileNameProps = {
  file: File | { name: string };
  value: any[];
  formik: FormikProps<any>;
  id: string;
  jwt: string;
};
export const FileName = ({ file, value, formik, id, jwt }: FileNameProps) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="truncate whitespace-nowrap text-ellipsis">
        {file.name}
      </span>
      <BsFillTrashFill
        className="w-4 h-4 shrink-0 hover:fill-gray-500 cursor-pointer"
        onClick={() => deleteFile(file, value, formik, id, jwt)}
      />
    </div>
  );
};
