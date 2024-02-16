import React from "react";

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
        className={`${classStyle}text-white select-none text-3xl uppercase font-bold inline-block  truncate whitespace-nowrap text-ellipsis`}
      >
        {prenom}
      </span>
      <span className="select-none text-3xl uppercase font-bold opacity-50 text-white">
        {nom && nom}.
      </span>
    </div>
  );
};

export default Name;
