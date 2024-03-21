import { FormikInscriptionWithoutExcluded } from "@/types/formulaire";
import axios from "axios";

const dataProfil = (values: FormikInscriptionWithoutExcluded) => {
  const json = {
    Telephone: values?.phone,
    Age: values.age,
    Lieu_de_Naissance: {
      Ville: values?.birthCity,
      Pays: values?.birthCountry,
      Code_postal: values?.birthPostal,
    },
    Physionomie: {
      Confection_Haut: values?.confectionHaut,
      Confection_Bas: values?.confectionBas,
      Chaussures: values?.chaussures,
      Taille: values?.taille,
      Cheveux: values?.cheveux,
      Yeux: values?.yeux,
      Origin: values?.origine,
    },
    Experience_tournage: values?.experiencesTournage,
    Infos_Administrative: {
      Securite_sociale: values?.socialNumber,
      Enfant_a_charges: values?.children ? values?.children : 0o0,
      Statut: values.statut,
      Retraite: values.retired,
      Intermittent: values.intermittent,
      Nationalite: values.nationality,
    },
    Role_Candidat: {
      Acteur: values?.acteur,
      Accepte_Figuration: values?.figuration,
      Modele: values?.modele,
      Accepte_Silhouette: values?.silhouette,
      Unique: values?.unique,
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
    },
    Instagram: values?.instagram,
    Location: {
      adresse: values?.address,
      Ville: values?.city,
      Code_postal: values?.postalCode,
      Pays: values?.country,
    },
    Data_intermittent: {
      Numero_conges_spectacle: values?.congeSpectacle,
      Visite_medicale: values?.lastMedicVisite ? values?.lastMedicVisite : null,
      Abattement: values?.abattement,
      CMB: values?.cmb ? values?.cmb : undefined,
    },
    Agence: {
      En_Agence: values?.agence,
      Agence_Infos: values?.agenceInfos,
    },
  };

  return json;
};

export const updateProfil = async (values: any, jwt: string, id: number) => {
  const formData = new FormData();

  if (values?.videodepresentation instanceof File) {
    formData.append(
      `files.Video_Presentation`,
      values?.videodepresentation,
      values?.videodepresentation?.name
    );
  }
  if (values?.cmb instanceof File) {
    formData.append(
      `files.Data_intermittent.CMB`,
      values?.cmb,
      values?.cmb?.name
    );
  }
  if (values?.photodepresentation instanceof File) {
    formData.append(
      `files.Photo_de_presentation`,
      values?.photodepresentation,
      values?.photodepresentation?.name
    );
  }

  const json = dataProfil(values);
  formData.append("data", JSON.stringify(json));

  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/candidats/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res;
  } catch (error: any) {
    console.error(
      "Une erreur s'est produite lors de la requête :",
      error.message
    );
    return error;
  }
};
