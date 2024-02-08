import { useMemo } from "react";
import { sendToast } from "./toast";

export const filterObject = (
  object: any,
  excludeField: string[] | undefined
) => {
  if (excludeField !== undefined) {
    return Object.fromEntries(
      Object.entries(object).filter(([key]) => !excludeField.includes(key))
    );
  }
};
export const checkFileSize = (file: File) => {
  const maxSizeInBytes = 100 * 1024 * 1024;
  if (file.size <= maxSizeInBytes) {
    return file;
  } else {
    sendToast(true, "File size exceeds the maximum allowed size (100MB)");
    return;
  }
};
