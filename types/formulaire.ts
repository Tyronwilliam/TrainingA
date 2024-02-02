export interface FormikContactProps {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  companyName: string;
  subject: string;
  message: string;
}
export interface FormikConnexionProps {
  email: string;
  password: string;
}
export type FormikForgotPropsWithoutPassword = Omit<
  FormikConnexionProps,
  "password"
>;

export interface FormikResetPasswordProps {
  password: string;
  passwordConfirmation: string;
}

export interface FormikInscriptionProps {
  email: string;
  password: string;
  marital: string;
  nomDeNaissance: string;
  firstname: string;
  gender: string;
  age: number | null | undefined;
  dateOfBirth: Date | null | undefined;
  birthCity: string;
  birthPostal: number | null | undefined;
  birthCountry: string;
  address: string;
  city: string;
  postalCode: number | null | undefined;
  country: string;
  nationality: string;
  residencePermit: number | null | undefined;
  phone: number | null | undefined;
  socialNumber: number | null | undefined;
  statut: string;
  children: number | null | undefined;
  retired: boolean;
}
export interface StepType {
  label: string;
  helper: string | null;
  type: string;
  required: boolean;
  placeholder: string | null | undefined;
  id: string;
}
