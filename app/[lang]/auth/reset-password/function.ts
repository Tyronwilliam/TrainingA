import { resetPassword } from "@/services/auth/password";
import { FormikResetPasswordProps } from "@/types/formulaire";

const handleSubmissionResponse = (
  response: any,
  finishSubmission: Function,
  router: (arg: string) => void
) => {
  if (response.status === 200) {
    finishSubmission("");
    router("auth/connexion");
  } else {
    finishSubmission(`${response?.response?.data?.error?.name}`);
  }
};
export const handleSubmit = async (
  values: FormikResetPasswordProps,
  code: string | null,
  startSubmission: Function,
  finishSubmission: Function,
  router: (arg: string) => void
) => {
  startSubmission();

  try {
    const response = await resetPassword(
      code,
      values?.password,
      values?.passwordConfirmation
    );
    handleSubmissionResponse(response, finishSubmission, router);
  } catch (err) {
    finishSubmission("An error occurred");
  }
};
