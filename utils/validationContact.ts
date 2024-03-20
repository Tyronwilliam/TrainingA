import * as Yup from "yup";
import { phoneNumberRegex } from "./regex";
import { FormikContactProps } from "@/types/formulaire";

export const initialValues: FormikContactProps = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  companyName: "",
  subject: "",
  message: "",
};
export const ContactSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(phoneNumberRegex, "Invalid phone number")
    .required("Requiered"),
  companyName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  subject: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  message: Yup.string()
    .min(2, "Too Short!")
    .max(350, "Too Long!")
    .required("Required"),
});
