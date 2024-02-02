import { FormikInscriptionProps } from "@/types/formulaire";
import * as Yup from "yup";
import { phoneNumberRegex, socSecNumberRegex } from "./regex";
export const inscriptionInitialValues: FormikInscriptionProps = {
  email: "",
  password: "",
  marital: "",
  nomDeNaissance: "",
  firstname: "",
  gender: "",
  age: undefined,
  dateOfBirth: undefined,
  birthCity: "",
  birthPostal: undefined,
  birthCountry: "",
  address: "",
  city: "",
  postalCode: undefined,
  country: "",
  nationality: "",
  residencePermit: undefined,
  phone: undefined,
  socialNumber: undefined,
  statut: "",
  children: undefined,
  retired: false,
};
export const StepOneSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
  marital: Yup.string(),
  nomDeNaissance: Yup.string().required("Required"),
  firstname: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  age: Yup.number().nullable().required("Required"),
  dateOfBirth: Yup.date().nullable().required("Required"),
  birthCity: Yup.string().required("Required"),
  birthPostal: Yup.number().nullable().required("Required"),
  birthCountry: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  postalCode: Yup.number().nullable().required("Required"),
  country: Yup.string().required("Required"),
  nationality: Yup.string().required("Required"),
  residencePermit: Yup.number().nullable(),
  phone: Yup.number()
    .nullable()
    .test(
      "phone",
      "Invalid phone number",
      (value) => !value || phoneNumberRegex.test(value.toString())
    )
    .required("Required"),
  socialNumber: Yup.number()
    .nullable()
    .test(
      "socialNumber",
      "Invalid Social Number",
      (value) => !value || socSecNumberRegex.test(value.toString())
    )
    .required("Required"),
  statut: Yup.string().required("Required"),
  children: Yup.number().nullable(),
  retired: Yup.boolean().required("Required"),
});
export const StepTwoSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});
