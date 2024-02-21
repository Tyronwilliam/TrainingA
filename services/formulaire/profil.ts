import { FormikInscriptionWithoutExcluded } from "@/types/formulaire";
import axios from "axios";

const dataProfil = (values: FormikInscriptionWithoutExcluded) => {
  const json = {
    Telephone: values?.phone,
    Age: values.age,
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
      Figurant: values?.figuration,
      Modele: values?.modele,
      Silhouette: values?.silhouette,
      Unique: values?.unique,
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

  const json = dataProfil(values);
  formData.append("data", JSON.stringify(json));

  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/candidats/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
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
