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

export const baseStepOneSchema = Yup.object().shape({
  age: Yup.number().nullable().required("Age Required"),
  address: Yup.string().required(" Address Required"),
  city: Yup.string().required("City Required"),
  postalCode: Yup.string()
    .matches(postalCodeRegex, "Invalid postal code")
    .required("Postal code Required"),
  country: Yup.string().required("Country Required"),
  residencePermit: Yup.number().nullable(),
  phone: Yup.string()
    .matches(phoneNumberRegex, "Invalid Phone Number")
    .required("Phone Required"),
  socialNumber: Yup.string()
    .matches(socSecNumberRegex, "Invalid Social Number")
    .required("Social Number Required"),
  statut: Yup.string().required("Statut Required"),
  children: Yup.number().optional(),
  retired: Yup.boolean().required("Retired Required"),
});
const SchemaInscription = Yup.object().shape({
  marital: Yup.string().nullable(),
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string().min(8, "Too Short!").required("Password Required"),
  nomDeNaissance: Yup.string().required("Lastname Required"),
  firstname: Yup.string().required("Firstname Required"),
  gender: Yup.string().required("Gender Required"),
  dateOfBirth: Yup.date().nullable().required("Date Of Birth Required"),
  birthPostal: Yup.string()
    .matches(postalCodeRegex, "Invalid postal code")
    .required("Birth Postal Required"),
  birthCity: Yup.string().required("Birth City Required"),
  birthCountry: Yup.string().required("Birth Country Required"),
  nationality: Yup.string().required("Nationality Required"),
});
export const StepOneSchema = baseStepOneSchema.concat(SchemaInscription);

export const StepTwoSchema = Yup.object().shape({
  intermittent: Yup.boolean().required("Required"),
  congeSpectacle: Yup.string().when("intermittent", {
    is: true,
    then: (schema) => Yup.string().required("Leave Number Required"),
    otherwise: (schema) => schema.nullable(),
  }),
  lastMedicVisite: Yup.date().when("intermittent", {
    is: true,
    then: (schema) => Yup.date().required("Last Medical Visite Required"),
    otherwise: (schema) => schema.nullable(),
  }),
  abattement: Yup.string().when("intermittent", {
    is: true,
    then: (schema) => Yup.string().required("Allowance Required"),
    otherwise: (schema) => schema.nullable(),
  }),
  cmb: Yup.mixed().when("intermittent", {
    is: true,
    then: (schema) => Yup.mixed().required("CMB File is required"),
    otherwise: (schema) => Yup.mixed().nullable(),
  }),
});

export const StepThreeSchema = Yup.object().shape({
  confectionHaut: Yup.string().required("Upper Clothing Required"),
  confectionBas: Yup.string().required("Lower Clothing Required"),
  cheveux: Yup.string().required("Hair Color Required"),
  yeux: Yup.string().required("Eyes Color Required"),
  taille: Yup.string().required("Height Required"),
  chaussures: Yup.string().required("Shoes size Required"),
  origine: Yup.string().required("Origin Required"),
  // unique: Yup.boolean().required("Required"),
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
    then: (schema) => Yup.string().required("Agency Informations Required"),
    otherwise: (schema) => schema.nullable(),
  }),
  instagram: Yup.string().nullable(),
});
const SchemaPhotoInscription = Yup.object().shape({
  photodepresentation: Yup.mixed().required("Presentation File is required"),
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
export const SchemaRole = Yup.object().shape({
  acteur: Yup.boolean().required("Required"),
  modele: Yup.boolean().required("Required"),
  figuration: Yup.boolean().required("Required"),
  silhouette: Yup.boolean().required("Required"),
});
export const StepFiveSchema = SchemaRole.concat(SchemaPhotoInscription);

export const SchemaVideoInscription = Yup.object().shape({
  videodepresentation: Yup.mixed().required("Presentation Video Required"),
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

export const StepSixSchema = SchemaVideoInscription;
