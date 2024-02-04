import React from "react";
import toast from "react-hot-toast";

const DissmissToast = ({ error }: { error: string }) => {
  return toast((t) => (
    <span>
      {error} <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
    </span>
  ));
};

export default DissmissToast;
