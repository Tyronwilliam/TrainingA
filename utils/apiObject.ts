export const apiObject = (id: string, data: any) => {
  switch (id) {
    case "autresphotos":
      return {
        data: {
          Portfolio: {
            Portfolio: data,
          },
        },
      };
      break;
    case "bandeDemo":
      return {
        data: {
          Bande_Demo: data,
        },
      };
      break;
    case "photodepresentation":
      return {
        data: {
          Photo_de_presentation: data,
          inscription_Termine: true,
        },
      };
      break;
    case "videodepresentation":
      return {
        data: {
          Video_Presentation: data,
        },
      };
      break;

    default:
      break;
  }
};
