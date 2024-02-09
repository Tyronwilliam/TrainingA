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
      const [value] = tailleRange.split("/").map(Number);

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
    const [start, end] = ageRange.split("/").map(Number);

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
    .split(",")
    .map((value: string) => encodeURIComponent(value));

  const competenceFilters = encodedValues.map(
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
