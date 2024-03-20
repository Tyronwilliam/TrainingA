import { Dictionary } from "@/types/dictionary";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
export interface PhysioState {
  Age: string[]; // Change 'any' to the actual type of your Age array elements
  Taille: string; // Change 'any' to the actual type of your Taille array elements
  Type: string[]; // Change 'any' to the actual type of your Type array elements
  Compétence: string[];
  Prenom: string;
  Unique: boolean; // Change 'any' to the actual type of your Compétence array elements
  [key: string]: string[] | string | boolean;
}
export interface PhysionomieProps {
  dictionary: Dictionary;
  valuePhysio: PhysioState;
  handlePhysioQuery: (value: string | boolean, key: string) => void;
  currentList: string;
  handleCurrentList: (list: string) => void;
  router: AppRouterInstance;
  gender: string;
  pathname: string;
}
export interface CTAListProps {
  cle: string;
  value: React.ReactNode;
  handleClick: (arg: string) => void;
  current: string | string[];
  customStyle: string;
  handleFilter?: (role: string) => void;
  handlePhysioQuery?: (value: string, key: string) => void;
  onlyMapKey?: string;
  onlyObjectKey?: string;
}
export interface RoleFilterProps {
  dictionary: Dictionary;
  currentRole: string;
  handleClick: (role: string) => void;
  handleFilter: (role: string) => void;
}
