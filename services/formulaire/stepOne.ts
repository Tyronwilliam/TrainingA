import { FormikInscriptionProps } from "@/types/formulaire";
import axios from "axios";

export const createUser = async (values: FormikInscriptionProps) => {
  const userName = `${values.firstname}${values?.nomDeNaissance}`;
  const cleanedUserName = userName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const finalUserName = cleanedUserName + randomNumber?.toString();
  const data = {
    username: finalUserName,
    email: values?.email,
    password: values?.password,
    Autorisation: {
      Fonction: "Regular",
      compte_actif: true,
    },
    Informations_General: {
      Nom: values?.nomDeNaissance || values?.marital,
      Prenom: values?.firstname,
    },
    Location: {
      adresse: values?.address,
      Ville: values?.city,
      Code_postal: values?.postalCode,
      Pays: values?.country,
    },
  };
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, data)
    .then((res) => res)
    .catch((err) => err);
};
export const createCandidat = async (
  values: FormikInscriptionProps,
  userId: number
) => {
  const data = {
    Email: values?.email,
    Nom: values?.nomDeNaissance || values?.marital,
    Prenom: values?.firstname,
    Nom_de_naissance: values?.nomDeNaissance,
    Sexe: values?.gender,
    Date_de_naissance: values?.dateOfBirth,
    Telephone: values?.phone,
    Age: values?.age,
    Location: {
      adresse: values?.address,
      Ville: values?.city,
      Code_postal: values?.postalCode,
      Pays: values?.country,
    },
    Lieu_de_Naissance: {
      Ville: values?.birthCity,
      Pays: values?.birthCountry,
      Code_postal: values?.birthPostal,
    },
    user: userId,
    inscription_Termine: false,
  };
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/candidats`, { data: data })
    .then((res) => res)
    .catch((err) => err);
};
