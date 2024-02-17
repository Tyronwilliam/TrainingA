import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Name = ({
  prenom,
  nom,
  classStyle,
  containerStyle,
}: {
  prenom: string;
  nom: string | undefined;
  classStyle: string;
  containerStyle: string;
}) => {
  return (
    <div className={`flex gap-2 ${containerStyle}`}>
      <span
        className={`${classStyle} text-white select-none  uppercase font-bold inline-block  truncate whitespace-nowrap text-ellipsis`}
      >
        {prenom}
      </span>
      <span
        className={`${classStyle} select-none  uppercase font-bold opacity-50 text-white`}
      >
        {nom && nom}.
      </span>
      <button>
        {" "}
        <AiOutlinePlusCircle className="add_package" />
      </button>
    </div>
  );
};

export default Name;
