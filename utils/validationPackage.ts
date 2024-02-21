import { ContractInitialValues } from "@/types/formulaire";
import * as Yup from "yup";

export const contractInitialValues: ContractInitialValues = {
  nameOfFilm: "",
  prodNameField: "",
  adresse: "",
  siret: 0o0,
  assedic: "",
  apec: "",
  realisateur: "",
  role: "",
  remuneration: 0o0,
  heureTravail: 0o0,
  duree: null,
  jours: 0o0,
  lieuDeTravail: "",
  faitLe: null,
};
export const contractSchema = Yup.object().shape({
  nameOfFilm: Yup.string().required("Required"),
  prodNameField: Yup.string().required("Required"),
  realisateur: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  remuneration: Yup.number().required("Required"),
  duree: Yup.string().required("Required"),
  faitLe: Yup.date().nullable().required("Required"),
});
