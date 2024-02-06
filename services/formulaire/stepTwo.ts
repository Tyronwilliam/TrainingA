import { FormikInscriptionProps } from "@/types/formulaire";
import axios from "axios";

export const sendStepTwoData = async (
  values: FormikInscriptionProps,
  candidatId: number,
  jwt: string
) => {
  const socialNumberToString = parseInt(values?.socialNumber);
  const formData = new FormData();

  const data = {
    Infos_Administrative: {
      Securite_sociale: socialNumberToString,
      Enfant_a_charges: values?.children,
      Statut: values?.statut,
      Retraite: values?.retired,
      Intermittent: values?.intermittent,
      Nationalite: values?.nationality,
      Titre_de_Sejour: values?.residencePermit,
    },
    Data_intermittent: {
      Numero_conges_spectacle: values?.congeSpectacle,
      Visite_medicale: values?.lastMedicVisite ? values?.lastMedicVisite : null,
      Abattement: values?.abattement,
    },
  };
  if (values?.cmb) {
    formData.append(
      `files.Data_intermittent.CMB`,
      values?.cmb,
      values?.cmb?.name
    );
  }
  formData.append("data", JSON.stringify(data));

  return await axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/candidats/${candidatId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => res)
    .catch((err) => err);
};
