import axios from "axios";

interface LoginCredentials {
  identifier: string;
  password: string;
}
export const sendLoginRequest = async (data: LoginCredentials) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, data)
    .then((res) => res)
    .catch((err) => err);
};
export const getUserProfile = async (jwt: string) => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/users/me?populate=*`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);
};
