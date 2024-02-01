import { useState } from "react";

function useToggle() {
  const [open, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!open);
  };
  // a remove d'ici
  const capitalizeFirstLetter = (
    nom: string | undefined
  ): string | undefined => {
    return nom ? nom.substring(0, 1).toUpperCase() : undefined;
  };

  return { toggle, open, capitalizeFirstLetter };
}

export default useToggle;
