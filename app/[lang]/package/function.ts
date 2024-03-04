export function comparerPrenom(candidat1: any, candidat2: any) {
  // Compare first names (Prenom) first
  const prenomComparison = candidat1.attributes?.Prenom.localeCompare(
    candidat2.attributes?.Prenom,
    "fr",
    {
      sensitivity: "base",
    }
  );

  // If first names are the same, compare last names (Nom)
  if (prenomComparison === 0) {
    return candidat1.attributes?.Nom.localeCompare(
      candidat2.attributes?.Nom,
      "fr",
      {
        sensitivity: "base",
      }
    );
  }

  return prenomComparison;
}
