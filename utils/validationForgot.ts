import * as Yup from "yup";
import { FormikForgotPropsWithoutPassword } from "@/types/formulaire";

export const ForgotInitialValues: FormikForgotPropsWithoutPassword = {
  email: "",
};
export const ForgotSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});
