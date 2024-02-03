import axios, { AxiosHeaders } from "axios";

const axiosMutationFile = async (
  url: string,
  formData: FormData,
  headers: Record<string, string>
) => {
  const response = await axios
    .post(url, formData, { headers })
    .then((res) => res)
    .catch((err: any) => {
      console.error(err, "FROM AXIOS MUTATION");
      return err;
    });
  return response;
};
export const uploadFile = async (file: any, url: string, jwt: string) => {
  const formData = new FormData();

  if (file instanceof File) {
    formData.append("files", file);
  }

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${jwt}`,
  };
  try {
    const response = await axiosMutationFile(url, formData, headers);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const putPortfolio = async () => {};
