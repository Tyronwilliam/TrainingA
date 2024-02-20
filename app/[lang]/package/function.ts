export function comparerPrenom(candidat1: any, candidat2: any) {
  return candidat1.attributes?.Prenom.localeCompare(
    candidat2.attributes?.Prenom,
    "fr",
    {
      sensitivity: "base",
    }
  );
}
