import axios from "axios";
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
    return;
  }
};
export const downloadFile = async (url: string, name: string, folder: any) => {
  try {
    const response = await axios
      .post(`/api/filedownload`, { params: { urlImage: url } })
      .then((res) => res)
      .catch((err) => err);

    if (response.status !== 200) {
      console.log(response);
    }

    const blob = await response.blob();

    // Append the blob to the specified folder
    folder.file(name, blob);
    console.log(blob);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
