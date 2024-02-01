import axios from "axios";

export const sendForgotPasswordEmail = async (email: string) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
      email: email,
    })
    .then((response) => response)
    .catch((error) => error);
};
export const resetPassword = async (
  code: string | null,
  password: string,
  passwordConfirmation: string
) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
      code: code,
      password: password,
      passwordConfirmation: passwordConfirmation,
    })
    .then((response) => response)
    .catch((error) => error);
};
