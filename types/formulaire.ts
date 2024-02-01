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
