import { FormikConnexionProps } from "@/types/formulaire";
import { sendToast } from "@/utils/toast";
import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleSubmission = async (
  startSubmission: Function,
  values: FormikConnexionProps,
  finishSubmission: Function,
  router: AppRouterInstance,
  isPack: boolean,
  toggle?: () => void
) => {
  startSubmission();
  try {
    const result = await signIn("credentials", {
      email: values?.email,
      password: values?.password,
      redirect: false,
    });
    if (result?.error) {
      finishSubmission(result?.error);
    } else {
      if (isPack) {
        sendToast(false, "Logged in");
        toggle && toggle();
        router.refresh();
      } else {
        router.push("/");
      }
      finishSubmission();
    }
  } catch (err) {
    console.log(err);
    finishSubmission("An error occurred");
  }
};
