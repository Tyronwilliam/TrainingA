import { FormikInscriptionProps } from "@/types/formulaire";
import * as Yup from "yup";
import { phoneNumberRegex, postalCodeRegex, socSecNumberRegex } from "./regex";
export const inscriptionInitialValues: FormikInscriptionProps = {
  email: "",
  password: "",
  marital: "",
  nomDeNaissance: "",
  firstname: "",
  gender: "",
  age: null,
  dateOfBirth: null,
  birthCity: "",
  birthPostal: null,
  birthCountry: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  nationality: "",
  residencePermit: null,
  phone: null,
  socialNumber: null,
  statut: "",
  children: null,
  retired: false,
  intermittent: false,
  congeSpectacle: "",
  lastMedicVisite: null,
  abattement: false,
  cmb: "",
  confectionHaut: "",
  confectionBas: "",
  cheveux: "",
  yeux: "",
  taille: "",
  chaussures: "",
  origine: "",
  //
  defile: false,
  danseClassique: false,
  danseContemporaine: false,
  hipHop: false,
  sportif: false,
  skate: false,
  ski: false,
  experiencesTournage: "",
  autres: "",
  agence: false,
  instagram: "",
  agenceInfos: "",
  acteur: false,
  modele: false,
  figuration: false,
  silhouette: false,
  photodepresentation: "",
  autresphotos: [],
  bandeDemo: [],
  videodepresentation: "",
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
  birthPostal: Yup.string()
    .matches(postalCodeRegex, "Invalid postal code")
    .required("Le code postal est obligatoire."),
  birthCountry: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  postalCode: Yup.string()
    .matches(postalCodeRegex, "Invalid postal code")
    .required("Le code postal est obligatoire."),
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
  intermittent: Yup.boolean().required("Required"),
  congeSpectacle: Yup.string().when("intermittent", {
    is: true,
    then: (schema) => Yup.string().required("Required"),
    otherwise: (schema) => schema.nullable(),
  }),
  lastMedicVisite: Yup.date().when("intermittent", {
    is: true,
    then: (schema) => Yup.date().required("Required"),
    otherwise: (schema) => schema.nullable(),
  }),
  abattement: Yup.string().when("intermittent", {
    is: true,
    then: (schema) => Yup.string().required("Required"),
    otherwise: (schema) => schema.nullable(),
  }),
  cmb: Yup.string().when("intermittent", {
    is: true,
    then: (schema) => Yup.string().required("Required"),
    otherwise: (schema) => schema.nullable(),
  }),
});
export const StepThreeSchema = Yup.object().shape({
  confectionHaut: Yup.string().required("Required"),
  confectionBas: Yup.string().required("Required"),
  cheveux: Yup.string().required("Required"),
  yeux: Yup.string().required("Required"),
  taille: Yup.string().required("Required"),
  chaussures: Yup.string().required("Required"),
  origine: Yup.string().required("Required"),
});

export const StepFourSchema = Yup.object().shape({
  defile: Yup.boolean().required("Required"),
  danseClassique: Yup.boolean().required("Required"),
  danseContemporaine: Yup.boolean().required("Required"),
  hipHop: Yup.boolean().required("Required"),
  sportif: Yup.boolean().required("Required"),
  skate: Yup.boolean().required("Required"),
  ski: Yup.boolean().required("Required"),
  experiencesTournage: Yup.string().nullable(),
  autres: Yup.string().nullable(),
  agence: Yup.boolean().required("Required"),
  agenceInfos: Yup.string().when("agence", {
    is: true,
    then: (schema) => Yup.string().required("Required"),
    otherwise: (schema) => schema.nullable(),
  }),
  instagram: Yup.string().nullable(),
});
export const StepFiveSchema = Yup.object().shape({
  acteur: Yup.boolean().required("Required"),
  modele: Yup.boolean().required("Required"),
  figuration: Yup.boolean().required("Required"),
  silhouette: Yup.boolean().required("Required"),
  photodepresentation: Yup.string().required("Required"),
  autresphotos: Yup.array()
    .required("Required")
    .test("max-photos", "15 pictures max", (value) => value.length <= 15)
    .test("file-instance", "Veuillez enregistrer vos photos", (value) => {
      // Check if any item in the array is an instance of File
      return !value.some((item) => item instanceof File);
    }),
});
export const StepSixSchema = Yup.object().shape({
  videodepresentation: Yup.string().required("Required"),
  bandeDemo: Yup.array()
    .required("Required")
    .test("max-photos", "15 pictures max", (value) => value.length <= 3)
    .test("file-instance", "Veuillez enregistrer vos photos", (value) => {
      // Check if any item in the array is an instance of File
      return !value.some((item) => item instanceof File);
    }),
});
