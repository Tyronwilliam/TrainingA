import { FormikProps } from "formik";

export interface PutDataPortfolioParams {
  candidatId: number;
  jwt: string;
  files: File[];
  formik: FormikProps<any>;
  id: string;
}

export interface DeletePhotoParams {
  file: any;
  jwt: string;
}
