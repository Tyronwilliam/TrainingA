import axios, { AxiosResponse } from "axios";

export interface CaptchaResponse {
  success: boolean;

  // Add other properties as needed
}

export const verifiedCaptcha = async (
  token: string
): Promise<AxiosResponse<CaptchaResponse>> => {
  return await axios({
    method: "post",
    url: "/api/recaptcha",
    data: {
      gRecaptchaToken: token,
    },
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
};
