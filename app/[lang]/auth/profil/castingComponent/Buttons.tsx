import React from "react";

interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
  text: string;
}

const Buttons: React.FC<ButtonProps> = ({ disabled, onClick, text }) => {
  return (
    <button
      disabled={disabled}
      className="boutonSlideCommon radius w-44 p-2"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Buttons;
