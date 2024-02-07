import { FormikProfilProps } from "@/types/formulaire";
import * as Yup from "yup";
import { SchemaVideoInscription } from "./validationInscription";

export const profilInitialValues: FormikProfilProps = {
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
  newPhotos: [],
};
export const SchemaNewPhoto = Yup.object().shape({
    newPhotos: Yup.array()
    .min(1, "At least one vidéo is required")
    .max(15, "3 vidéos max")
    .test("file-instance", "Please save your file", (value) => {
      // Check if any item in the array is not an instance of File
      return (
        Array.isArray(value) && !value.some((item) => item instanceof File)
      );
    }),
});
export const SchemaPhotoVideoProfil = SchemaNewPhoto.concat(
  SchemaVideoInscription
);
