import axios from "axios";

interface LoginCredentials {
  identifier: string;
  password: string;
}
export const sendLoginRequest = async (data: LoginCredentials) => {
  try {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
      data
    );
  } catch (error: any) {
    console.log(error, "ERROR LOGIN");
    return error;
  }
};
export const getUserProfile = async (jwt: string) => {
  try {
    return await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  } catch (error) {
    console.log(error, "ERROR GET PROFILE");
    return error;
  }
};
