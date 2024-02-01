import { FormikResetPasswordProps } from "@/types/formulaire";
import * as Yup from "yup";

export const ResetPassworInitialValues: FormikResetPasswordProps = {
  password: "",
  passwordConfirmation: "",
};
export const ResetPassworSchema = Yup.object().shape({
  password: Yup.string().min(6, "Too Short!").required("Required"),
  passwordConfirmation: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
