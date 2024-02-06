import { FormikInscriptionProps } from "@/types/formulaire";
import * as Yup from "yup";
import { phoneNumberRegex, postalCodeRegex, socSecNumberRegex } from "./regex";

// Changer toast react quand ine photos est ajouté (text)
//Ajouter le diclaimer au début
// Ajouté succes du form a la fin
// Soit enlever précedent
// Soit avoir une logique si t'"a appuer sur précedent ne pas relancer la requete API"


export const inscriptionInitialValues: FormikInscriptionProps = {
  email: "",
  password: "",
  marital: "",
  nomDeNaissance: "",
  firstname: "",
  gender: "",
  age: 0o0,
  dateOfBirth: null,
  birthCity: "",
  birthPostal: "",
  birthCountry: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  nationality: "",
  residencePermit: null,
  phone: "",
  socialNumber: "",
  statut: "",
  children: 0o0,
  retired: false,
  intermittent: false,
  congeSpectacle: "",
  lastMedicVisite: null,
  abattement: false,
  cmb: null,
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
  photodepresentation: null,
  autresphotos: [],
  bandeDemo: [],
  videodepresentation: null,
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
    .required("Required"),
  birthCountry: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  postalCode: Yup.string()
    .matches(postalCodeRegex, "Invalid postal code")
    .required("Required"),
  country: Yup.string().required("Required"),
  nationality: Yup.string().required("Required"),
  residencePermit: Yup.number().nullable(),
  phone: Yup.string()
    .matches(phoneNumberRegex, "Invalid Phone Number")
    .required("Required"),
  socialNumber: Yup.string()
    .matches(socSecNumberRegex, "Invalid Social Number")
    .required("Required"),
  statut: Yup.string().required("Required"),
  children: Yup.number().optional(),
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
  cmb: Yup.mixed().when("intermittent", {
    is: true,
    then: (schema) => Yup.mixed().required("File is required"),
    otherwise: (schema) => Yup.mixed().nullable(),
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
  photodepresentation: Yup.mixed().required("File is required"),
  autresphotos: Yup.array()
    .min(1, "At least one photo is required")
    .max(15, "15 pictures max")
    .test("file-instance", "Please save your file", (value) => {
      // Check if any item in the array is not an instance of File
      return (
        Array.isArray(value) && !value.some((item) => item instanceof File)
      );
    }),
});
export const StepSixSchema = Yup.object().shape({
  videodepresentation: Yup.mixed().required("Required"),
  bandeDemo: Yup.array()
    .min(1, "At least one vidéo is required")
    .max(15, "3 vidéos max")
    .test("file-instance", "Please save your file", (value) => {
      // Check if any item in the array is not an instance of File
      return (
        Array.isArray(value) && !value.some((item) => item instanceof File)
      );
    }),
});
