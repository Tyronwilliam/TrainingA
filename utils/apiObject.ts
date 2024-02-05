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

    default:
      break;
  }
};
