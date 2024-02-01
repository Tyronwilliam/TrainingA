import { sendForgotPasswordEmail } from "@/services/auth/password";
import { FormikForgotPropsWithoutPassword } from "@/types/formulaire";

const handleSubmissionResponse = (
  response: any,
  finishSubmission: Function
) => {
  if (response.status === 200) {
    finishSubmission("");
  } else {
    finishSubmission(`${response?.response?.data?.error?.name}`);
  }
};
export const handleSubmit = async (
  values: FormikForgotPropsWithoutPassword,
  startSubmission: Function,
  finishSubmission: Function
) => {
  startSubmission();
  const response = await sendForgotPasswordEmail(values?.email);
  try {
    handleSubmissionResponse(response, finishSubmission);
  } catch (err) {
    finishSubmission("An error occurred");
  }
};
