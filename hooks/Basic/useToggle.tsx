import { useState } from "react";

function useToggle() {
  const [open, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!open);
  };

  return { toggle, open };
}

export default useToggle;
