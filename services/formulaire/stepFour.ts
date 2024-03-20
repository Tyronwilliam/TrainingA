import { FormikInscriptionProps } from "@/types/formulaire";
import axios from "axios";

export const sendStepFourAndFive = async (
  values: FormikInscriptionProps,
  candidatId: number,
  jwt: string
) => {
  const data = {
    Role_Candidat: {
      Unique: false,
      Acteur: values?.acteur,
      Figurant: values?.figuration,
      Modele: values?.modele,
      Silhouette: values?.silhouette,
      Competence: {
        Defile_de_mode: values?.defile,
        Danse_Classique: values?.danseClassique,
        Danse_Contemporaine: values?.danseContemporaine,
        HipHop: values?.hipHop,
        Sportif: values?.sportif,
        Skate: values?.skate,
        Ski: values?.ski,
        Autres: values?.autres,
      },
    },
    Agence: {
      En_Agence: values?.agence,
      Agence_Infos: values?.agenceInfos,
    },
    inscription_Termine: true,
    Experience_tournage: values?.experiencesTournage,
    Instagram: values?.instagram,
  };
  return await axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/candidats/${candidatId}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => res)
    .catch((err) => err);
};
