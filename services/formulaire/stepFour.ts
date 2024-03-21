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
      Accepte_Figuration: values?.figuration,
      Modele: values?.modele,
      Accepte_Silhouette: values?.silhouette,
      Competence: {
        Mannequin_Pro: values?.mannequinPro,
        Danse_Classique: values?.danseClassique,
        Danse_Contemporaine: values?.danseContemporaine,
        HipHop: values?.hipHop,
        Sportif: values?.sportif,
        Skate: values?.skate,
        Ski: values?.ski,
        Autres: values?.autres,
        humoriste_Stand_up: values?.humoristeStandUp,
        Chant: values?.chant,
        Rap: values?.rap,
        Guitare: values?.guitare,
        Batterie: values?.batterie,
        Piano: values?.piano,
        Violon: values?.violon,
        Circassien: values?.circassien,
        Autre_instrument: values?.autreInstrument,
        Foot: values?.foot,
        Pole_dance: values?.poleDance,
        Basket: values?.basket,
        Tennis: values?.tennis,
        Equitation: values?.equitation,
        Boxe: values?.boxe,
        Yoga: values?.yoga,
      },
      PHYSIQUE: {
        nombreux_tatouage: values?.tatoo,
        tres_muscle: values?.muscle,
        skinny: values?.skinny,
        plus_size: values?.plusSize,
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
