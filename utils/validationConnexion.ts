import { FormikConnexionProps } from "@/types/formulaire";
import * as Yup from "yup";

export const initialValuesConnexion: FormikConnexionProps = {
  email: "",
  password: "",
};
export const ConnexionSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});
