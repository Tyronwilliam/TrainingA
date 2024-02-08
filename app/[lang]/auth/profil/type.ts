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
  candidatId?: number | "" | undefined;
  jwt?: string;
  mergedStepSix: Record<string, StepType>;
  isSubmitting: boolean;
};

export type TabProps = {
  currentTab: number | null;
  handleClick: (arg: number) => void;
  index: number;
  children: ReactNode;
  title: string;
  formik: FormikProps<FormikInscriptionWithoutExcluded>;
};
