import { excludeField } from "@/app/[lang]/auth/profil/ProfilLayout";

export interface FormikContactProps {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  companyName: string;
  subject: string;
  message: string;
}
export interface FormikConnexionProps {
  email: string;
  password: string;
}
export type FormikForgotPropsWithoutPassword = Omit<
  FormikConnexionProps,
  "password"
>;

export interface FormikResetPasswordProps {
  password: string;
  passwordConfirmation: string;
}

export interface FormikInscriptionProps {
  email: string;
  password: string;
  marital: string;
  nomDeNaissance: string;
  firstname: string;
  gender: string;
  age: number | null;
  dateOfBirth: Date | null;
  birthCity: string;
  birthPostal: string;
  birthCountry: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  nationality: string;
  residencePermit: number | null;
  phone: string;
  socialNumber: string;
  statut: string;
  children: number | null | string;
  retired: boolean;
  intermittent: boolean;
  congeSpectacle: string;
  lastMedicVisite: Date | null;
  abattement: boolean;
  cmb: File | null;
  confectionHaut: string;
  confectionBas: string;
  cheveux: string;
  yeux: string;
  taille: string;
  chaussures: string;
  origine: string;
  defile: boolean;
  danseClassique: boolean;
  danseContemporaine: boolean;
  hipHop: boolean;
  sportif: boolean;
  skate: boolean;
  ski: boolean;
  experiencesTournage: string;
  autres: string;
  agence: boolean;
  instagram: string;
  agenceInfos: string;
  acteur: boolean;
  modele: boolean;
  figuration: boolean;
  silhouette: boolean;
  photodepresentation: File | null;
  autresphotos: [];
  videodepresentation: File | null;
  bandeDemo: [];
}
export interface StepType {
  label: string;
  helper: string | undefined;
  type: string;
  required: boolean;
  placeholder: string;
  id: string;
  limit?: number;
  options?: Record<string, string>;
  accept?: string;
  multiple?: boolean;
  pattern?: string;
}

export type FormikInscriptionWithoutExcluded = Omit<
  FormikInscriptionProps,
  | "email"
  | "password"
  | "nomDeNaissance"
  | "firstname"
  | "gender"
  | "dateOfBirth"
  | "birthCity"
  | "birthPostal"
  | "birthCountry"
  | "photodepresentation"
  | "autresphotos"
  | "marital"
> & {
  newPhotos: [];
  unique: boolean;
};
export type ContractInitialValues = {
  nameOfFilm: string;
  prodNameField: string;
  adresse: string;
  siret: number | null;
  assedic: string;
  apec: string;
  realisateur: string;
  role: string;
  remuneration: number | null;
  heureTravail: number | null;
  duree: Date | null;
  jours: number | null;
  lieuDeTravail: string;
  faitLe: Date | null;
};
