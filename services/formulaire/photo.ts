import { DeletePhotoParams, PutDataPortfolioParams } from "@/types/photo";
import { apiObject } from "@/utils/apiObject";
import axios from "axios";

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
  file?.forEach((item: any) => {
    if (item instanceof File) {
      formData.append("files", item);
    }
  });

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

export const promisesUpload = async (
  files: File[] | File | null,
  jwt: string
) => {
  const arrayOfFile = Array.isArray(files) ? files : [files];
  try {
    const res = await uploadFile(
      arrayOfFile,
      `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      jwt
    );
    return res?.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
export const putDataPortfolio = async ({
  candidatId,
  jwt,
  files,
  formik,
  id,
}: PutDataPortfolioParams) => {
  const onlyFile = files?.filter((file) => file instanceof File);
  const promises = await promisesUpload(onlyFile, jwt);
  const promisesResolved = await Promise.all(promises);
  const nonFile = files?.filter((file) => !(file instanceof File));
  if (nonFile?.length > 0) promisesResolved.push(...nonFile);
  await formik.setFieldValue(id, promisesResolved);

  const response = await uploadFileInCandidat(
    promisesResolved,
    candidatId,
    id,
    jwt
  );
  return response;
};

export const uploadFileInCandidat = async (
  promisesResolved: {}[] | {},
  candidatId: number,
  id: string,
  jwt?: string
) => {
  const data = apiObject(id, promisesResolved);
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/candidats/${candidatId}?populate=Portfolio.Portfolio&populate=Bande_Demo`,
      data,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deletePhotos = async ({ file, jwt }: DeletePhotoParams) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/upload/files/${file?.id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};
