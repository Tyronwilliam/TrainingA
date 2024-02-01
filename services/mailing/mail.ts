import { FormikContactProps } from "@/types/formulaire";
import axios from "axios";
import { contentMailContact } from "./mailContent";

export async function sendContactMail(formValue: FormikContactProps) {
  const API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
  const API_BASE_URL = "https://api.brevo.com/v3";
  const { htmlContent, subject } = contentMailContact(formValue);
  const data = {
    sender: {
      name: formValue.lastname,
      email: formValue.email,
    },
    to: [
      {
        email: process.env.NEXT_PUBLIC_EMAIL,
      },
    ],
    subject,
    htmlContent,
  };
  return await axios
    .post(`${API_BASE_URL}/smtp/email`, data, {
      headers: {
        "api-key": API_KEY,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error sending email:", error.message);
      return error.message;
    });
}
