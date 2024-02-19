export interface PackSchema {
  id: number;
  attributes: {
    Nom: string;
    candidats: {
      data: Array<{
        id: string;
        attributes: {
          Nom: string;
          Prenom: string;
          Sexe: string;
        };
      }>;
    };
  };
}
