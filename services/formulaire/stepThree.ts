import { FormikInscriptionProps } from "@/types/formulaire";
import axios from "axios";

export const sendStepThreeData = async (
  values: FormikInscriptionProps,
  candidatId: number,
  jwt: string
) => {
  const data = {
    Physionomie: {
      Confection_Haut: values?.confectionHaut,
      Confection_Bas: values?.confectionBas,
      Chaussures: values?.chaussures,
      Taille: values?.taille,
      Cheveux: values?.cheveux,
      Yeux: values?.yeux,
      Origin: values?.origine,
    },
  };
  return await axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/candidats/${candidatId}`,
      { data: data },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => res)
    .catch((err) => err);
};
