import { sendToast } from "./toast";

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
    case "newPhotos":
      return {
        data: {
          Photo_Candidature: {
            Nouvelle_photos: data,
          },
        },
      };
    default:
      break;
  }
};

export const handleResponse = (res: any) => {
  if (res?.status === 200) {
    return res;
  } else {
    sendToast(true, res?.response?.data?.error?.message);
  }
};
