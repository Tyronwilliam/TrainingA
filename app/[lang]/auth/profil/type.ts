import { Dictionary } from "@/types/dictionary";
import { FormikInscriptionWithoutExcluded, StepType } from "@/types/formulaire";
import { FormikProps } from "formik";
import { ReactNode } from "react";

export type TabsLayoutProps = {
  currentTab: number | null;
  handleClick: (arg: number) => void;
  dictionary: Dictionary;
  formik: FormikProps<FormikInscriptionWithoutExcluded>;
  excludeField: string[];
  isLoadInput: boolean;
  setIsLoadInput: (isLoadInput: boolean) => void;
  open: boolean;
  toggle: () => void;
  isCurrentlyEditing: string;
  setIsCurrentlyEditing: (id: string) => void;
  candidatId: number | "" | undefined;
  mergedStepSix: Record<string, StepType>;
  isSubmitting: boolean;
  jwt: string | undefined;
};

export type TabProps = {
  currentTab: number | null;
  handleClick: (arg: number) => void;
  index: number;
  children: ReactNode;
  title: string;
  formik: FormikProps<FormikInscriptionWithoutExcluded>;
};
export interface Casting {
  id: number;
  attributes: {
    Titre: string;
    Lieu: string;
    Informations: {
      id: number;
      Date_Casting: string;
      liste_dispo: {
        data: { id: number }[];
      };
      liste_indispo: {
        data: { id: number }[];
      };
      Texte_Dispo: string;
      Texte_Indispo: string;
    }[];
  };
}
export interface CastingInfos {
  id: number;
  Date_Casting: string;
  liste_dispo: {
    data: { id: number }[];
  };
  liste_indispo: {
    data: { id: number }[];
  };
  Texte_Dispo: string;
  Texte_Indispo: string;
}

export interface Candidat {
  id: number;
}

export interface CastingLayoutProps {
  castings: Casting[];
  candidat: Candidat;
  connectCandidat: (
    castingId: number,
    candidatId: number,
    dateString: string,
    Informations: CastingInfos[],
    infosId: number
  ) => void;
  dissociateCandidat: (
    castingId: number,
    candidatId: number,
    dateString: string,
    Informations: CastingInfos[],
    infosId: number
  ) => void;
}
