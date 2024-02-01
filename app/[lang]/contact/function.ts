import { sendContactMail } from "@/services/mailing/mail";
import { verifiedCaptcha } from "@/services/security/google";
import { FormikContactProps } from "@/types/formulaire";

const handleSubmissionResponse = (
  response: any,
  finishSubmission: Function
) => {
  if (response.status === 201) {
    finishSubmission("");
  } else {
    finishSubmission(`${response}`);
  }
};

export const handleSubmit = async (
  values: FormikContactProps,
  startSubmission: Function,
  finishSubmission: Function,
  executeRecaptcha:
    | ((action?: string | undefined) => Promise<string>)
    | undefined
) => {
  startSubmission();

  if (!executeRecaptcha) {
    finishSubmission("Google n'autorise pas l'envoie de votre mail");
    return;
  }

  const token = await executeRecaptcha("onSubmit");
  const isVerified = await verifiedCaptcha(token)
    .then((res) => res.data.success)
    .catch((err) => err);

  if (isVerified) {
    try {
      const response = await sendContactMail(values);
      handleSubmissionResponse(response, finishSubmission);
    } catch (error: any) {
      console.error(error.message);
      finishSubmission("An error occurred");
    }
  } else {
    finishSubmission("Google n'autorise pas l'envoie de votre mail");
  }
};
