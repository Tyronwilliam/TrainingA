import { useMemo } from "react";

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
