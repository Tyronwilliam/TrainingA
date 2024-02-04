import { FormikProps } from "formik";

export interface PutDataPortfolioParams {
  candidatId: number;
  jwt: string;
  files: File[];
  formik: FormikProps<any>;
}
