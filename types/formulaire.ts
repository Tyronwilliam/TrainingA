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
  birthPostal: number | null;
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
  children: number | null;
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
