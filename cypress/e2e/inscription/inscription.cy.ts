const StepOnekeysArray = [
  "email",
  "password",
  "marital",
  "nomDeNaissance",
  "firstname",
  // "gender",
  "age",
  // "dateOfBirth",
  "birthCity",
  "birthPostal",
  "birthCountry",
  "address",
  "city",
  "postalCode",
  "country",
  "nationality",
  "residencePermit",
  "phone",
  "socialNumber",
  // "statut",
  "children",
  "retired",
];

describe("Navigation", () => {
  it("should navigate to the inscription page", () => {
    // Start from the index page
    cy.visit("/fr/inscription");

    // Iterate over StepOnekeysArray and get the inputs within elements with data-cy="input"
    StepOnekeysArray?.forEach((key) => {
      const selector = `[data-cy="input"] input[id^=${key}]`;

      cy.get(selector)
        .should("exist")
        .and("be.visible")
        .then(($input) => {
          const inputType = $input.attr("type");
          let value: string | number = "" || 0;

          // Assign appropriate values based on input type
          switch (inputType) {
            case "email":
              value = "test@example.com";
              break;
            case "password":
              value = "SecurePassword123";
              break;
            case "text":
              value = "SampleText";
              break;
            case "number":
              value = 25;
              break;
            // Add more cases for other input types as needed

            default:
            // Handle other input types or leave empty for no value assignment
          }

          // Type the value into the input field
          cy.get(selector).type(`${value}`);
        });
    });
  });
});

// Arrivée sur formuLAIREE / champs requis contiennent des asterix rouge
// Lorsque je touched l'input, et que la valeur est empty OU n'est pas valide, je dois avoir l'erreur qui s'affiche en dessous de l'input concerné
// Tester chaque input qui contient des restrictions specifique tel que email / telephone etc
// Le button doit être disabled si au moins 1 input requis n'est validé
// Le button ou click si au moins un input n'est pas valide ne doit rien déclencher
// Le button doit passer a la step suivnte si tout les inputs sont valide

// Le button precedent ne doit pas être display si la step est à zero
// Si la step est superieur à 0 on doit pouvoir voir le bouton previous
// Si le bouton previous est présent il doit toujours etre actif
// Lorsqu'on clique su r le bouton previous il doit nous emmeenr à la step precedente
// Lorsqu'on fait precedent, il ne doit y avoir aucune erreur dans le formulaire

// Step 2
// Si intermittent est false, on doit pas voir sur le dom les input correspondant a la state intermittent
// Si  intermittent est true dans ce cas le bouton il doit etre disanled
// les inout intermittent doivent avoir un asterix rouge

// Step 4
// On doit avoir le bouton qui est actif et pas de restriction
// Si en Agence true, on doit avoir le bouton disbaled

//Step5
// Bouton disabled
// Inout photo ils ont asterix rouge

// COmposant vos plus belle photos
// Si il est vide , les bouton gerer photos et send ne sont pas display
// Si l'input contient une valeur alors les bouton sont display
// Si l'input il contient une valeur et que cette valeur contient des fichier d'instance of File alors on a une erreur
// Si l'input contient une valeur qet que cette valeur ne conbtent d'instance of file/ pas d'erreur et le bouton next est actif et le bouton send est disabled

// Step 6
