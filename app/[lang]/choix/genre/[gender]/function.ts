export function generateTailleFilter(tailleRanges: string[]) {
  let tailleFilter = "";
  for (let i = 0; i < tailleRanges.length; i++) {
    const tailleRange = tailleRanges[i];
    let start, end;

    // Check if the range starts with ">"
    if (tailleRange.startsWith(">")) {
      const value = Number(tailleRange.substring(1));
      start = 100;
      end = value;
    } else {
      // Assume it's a single value
      const [value] = tailleRange?.split("/").map(Number);

      // Adjust start and end based on specific conditions
      if (value === 180) {
        start = 180;
        end = 200;
      } else {
        start = value;
        end = value + 20; // Adjust the end value based on your requirements
      }
    }

    // Append the filter for each value within the range
    for (let value = start; value <= end; value++) {
      tailleFilter += `&filters[Physionomie][Taille][$contains]=${value}`;
    }
  }

  return tailleFilter;
}

export function generateAgeFilter(ageRanges: string[]) {
  let ageFilter = "";

  for (let i = 0; i < ageRanges.length; i++) {
    const ageRange = ageRanges[i];
    const [start, end] = ageRange?.split("/").map(Number);

    if (i === 0) {
      if (ageRange.startsWith(">")) {
        ageFilter += `&filters[$or][0][Age][$between][0]=6&filters[$or][0][Age][$between][1]=16`;
      } else if (ageRange === "60+") {
        ageFilter += `&filters[$or][0][Age][$between][0]=61&filters[$or][0][Age][$between][1]=100`;
      } else {
        ageFilter += `&filters[$or][0][Age][$between][0]=${start}&filters[$or][0][Age][$between][1]=${end}`;
      }
    } else {
      if (ageRange.startsWith(">")) {
        ageFilter += `&filters[$or][1][Age][$between][0]=6&filters[$or][1][Age][$between][1]=16`;
      } else if (ageRange === "60+") {
        ageFilter += `&filters[$or][1][Age][$between][0]=61&filters[$or][1][Age][$between][1]=100`;
      } else {
        ageFilter += `&filters[$or][1][Age][$between][0]=${start}&filters[$or][1][Age][$between][1]=${end}`;
      }
    }
  }
  return ageFilter;
}
export function generateFilterQuery(values: string) {
  const encodedValues = values
    ?.split(",")
    ?.map((value: string) => encodeURIComponent(value));

  const competenceFilters = encodedValues?.map(
    (encodedValue: string, index: number) => {
      if (index === 0) {
        return `&filters[$or][${index}][Role_Candidat][Competence][${encodedValue}][$eq]=true`;
      } else {
        return `&filters[$or][${index}][Role_Candidat][Competence][${encodedValue}][$eq]=true`;
      }
    }
  );

  return competenceFilters.join("");
}
export function generateTypeFilter(types: string[]) {
  let typeFilter = "";

  for (let i = 0; i < types.length; i++) {
    const typeRange = types[i];
    if (i === 0) {
      typeFilter += `&filters[$or][${i}][Physionomie][Origin][$eq]=${typeRange}`;
    } else {
      typeFilter += `&filters[$or][${i}][Physionomie][Origin][$eq]=${typeRange}`;
    }
  }
  return typeFilter;
}

export function filterParams(
  queryParams: Record<string, string | null | undefined>
): Record<string, string> {
  const filteredParams: Record<string, string> = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== null && value !== undefined) {
      filteredParams[key] = String(value);
    }
  }

  return filteredParams;
}

export const handleQueryNumber = (
  mutateQueryNumber: any,
  stateNumber: number[] | null,
  value: number
) => {
  let numberQuery: any;

  if (mutateQueryNumber) {
    if (Array.isArray(stateNumber)) {
      if (stateNumber.includes(value)) {
        // Si l'index est déjà présent, le retirer
        numberQuery = stateNumber.filter(
          (selectedIndex) => selectedIndex !== value
        );
      } else {
        // Sinon, ajouter l'index à la fin du tableau
        numberQuery = [...stateNumber, value];

        // Si le tableau a maintenant plus de deux éléments, retirer le deuxième élément
        if (numberQuery.length > 2) {
          numberQuery[1] = value;
          numberQuery.pop();
        }
      }
      mutateQueryNumber(numberQuery?.length > 2 ? null : numberQuery);
    } else {
      // Si stateNumber n'est pas un tableau, initialiser numberQuery avec [value]
      const numberQuery = [value];
      mutateQueryNumber(numberQuery);
    }
  }
};
export const handleQueryTaille = (
  queryValueToArray: string[],
  value: string | boolean,
  key: string,
  queryInUrl: URLSearchParams
) => {
  if (
    !queryValueToArray?.includes(value.toString()) &&
    (key === "Taille" || key === "Prenom")
  ) {
    // Supprime tous les paramètres existants avec la même clé que le titre
    queryInUrl.delete(key);

    // Ajoute la nouvelle valeur
    queryInUrl.append(key, value.toString());
  } else {
    queryInUrl.delete(key);
  }
  return queryInUrl;
};

export const handleQuery = (
  queryValueToArray: string[],
  value: string | boolean,
  key: string,
  queryInUrl: URLSearchParams
) => {
  if (queryValueToArray.includes(value.toString())) {
    const updatedParamValues = queryValueToArray.filter(
      (value) => value !== value
    );

    // Supprime tous les paramètres existants avec la même clé que le titre
    queryInUrl.delete(key);

    // Ajoute toutes les valeurs mises à jour pour le paramètre spécifié par "key"
    if (updatedParamValues.length > 0) {
      queryInUrl.append(key, updatedParamValues.join(","));
    }

  } else {

    // Si la valeur n'est pas déjà présente, ajoutez-la comme avant
    if (queryValueToArray.length === 2) {
      queryValueToArray[1] = value.toString();
    } else {
      queryValueToArray.push(value.toString());
    }

    // Supprime tous les paramètres existants avec la même clé que le titre
    queryInUrl.delete(key);

    // Ajoute toutes les valeurs mises à jour pour le paramètre spécifié par "key"
    if (queryValueToArray.length > 0) {
      queryInUrl.append(key, queryValueToArray.join(","));
    }
  }
  return queryInUrl;
};

export const capitalizeFirstLetter = (
  nom: string | undefined
): string | undefined => {
  return nom ? nom.substring(0, 1).toUpperCase() : undefined;
};
