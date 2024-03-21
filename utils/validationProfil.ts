import { FormikInscriptionWithoutExcluded } from "@/types/formulaire";
import * as Yup from "yup";
import {
  SchemaRole,
  SchemaVideoInscription,
  StepFourSchema,
  StepThreeSchema,
  StepTwoSchema,
  baseStepOneSchema,
} from "./validationInscription";

// export const profilInitialValues: FormikInscriptionWithoutExcluded = {
//   age: 0o0,
//   address: "",
//   city: "",
//   postalCode: "",
//   country: "",
//   nationality: "",
//   residencePermit: null,
//   phone: "",
//   socialNumber: "",
//   statut: "",
//   children: 0o0,
//   retired: false,
//   intermittent: false,
//   congeSpectacle: "",
//   lastMedicVisite: null,
//   abattement: false,
//   cmb: null,
//   confectionHaut: "",
//   confectionBas: "",
//   cheveux: "",
//   yeux: "",
//   taille: "",
//   chaussures: "",
//   origine: "",
//   //
//   mannequinPro: false,
//   danseClassique: false,
//   danseContemporaine: false,
//   hipHop: false,
//   sportif: false,
//   skate: false,
//   ski: false,
//   experiencesTournage: "",
//   autres: "",
//   agence: false,
//   instagram: "",
//   agenceInfos: "",
//   acteur: false,
//   modele: false,
//   figuration: false,
//   silhouette: false,
//   bandeDemo: [],
//   videodepresentation: null,
//   newPhotos: [],
//   unique: false,
//   dateOfBirth: null,
//   birthPostal: "",
//   birthCity: "",
//   birthCountry: "",
//   photodepresentation: null,
//   humoristeStandUp: false,
//   chant: false,
//   rap: false,
//   guitare: false,
//   batterie: false,
//   piano: false,
//   violon: false,
//   autreInstrument: false,
//   circassien: false,
//   poleDance: false,
//   foot: false,
//   tennis: false,
//   basket: false,
//   boxe: false,
//   yoga: false,
//   equitation: false,
// };
export const SchemaNewPhoto = Yup.object().shape({
  newPhotos: Yup.array()
    .max(15, "15 photos max")
    .test("file-instance", "Please save your new file", (value) => {
      // Check if any item in the array is not an instance of File
      return (
        Array.isArray(value) && !value.some((item) => item instanceof File)
      );
    }),
});

const SchemaPhotoVideoProfil = SchemaNewPhoto.concat(SchemaVideoInscription);
export const SchemaValidationProfil = baseStepOneSchema
  .concat(StepTwoSchema)
  .concat(StepThreeSchema)
  .concat(StepFourSchema)
  .concat(SchemaRole)
  .concat(SchemaPhotoVideoProfil);
