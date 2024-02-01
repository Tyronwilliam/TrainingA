import { useState } from "react";

const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const startSubmission = () => {
    setIsSubmitting(true);
    setSubmitError("");
  };

  const finishSubmission = (error = "") => {
    setIsSubmitting(false);
    if (error === "") {
      setSubmitSuccess(true);
    }
    setSubmitError(error);
  };

  return {
    isSubmitting,
    submitError,
    startSubmission,
    finishSubmission,
    submitSuccess,
    setSubmitSuccess,
  };
};

export default useFormSubmission;
