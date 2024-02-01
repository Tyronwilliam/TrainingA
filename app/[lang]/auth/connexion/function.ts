import { FormikConnexionProps } from "@/types/formulaire";
import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleSubmission = async (
  startSubmission: Function,
  values: FormikConnexionProps,
  finishSubmission: Function,
  router: AppRouterInstance
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
      finishSubmission();
      router.push("/");
    }
  } catch (err) {
    console.log(err);
    finishSubmission("An error occurred");
  }
};
