import toast from "react-hot-toast";

export const sendToast = (isError: boolean, content: string) => {
  if (isError) {
    toast.error(content);
  } else {
    toast.success(content);
  }
};
