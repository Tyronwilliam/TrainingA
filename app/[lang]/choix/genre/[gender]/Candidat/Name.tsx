import React from "react";

const Name = ({
  prenom,
  nom,
  classStyle,
}: {
  prenom: string;
  nom: string | undefined;
  classStyle: string;
}) => {
  return (
    <div className={`flex gap-2 items-center justify-center  `}>
      <span
        className={`${classStyle} select-none text-3xl uppercase font-bold inline-block  truncate whitespace-nowrap text-ellipsis`}
      >
        {/* */}
        {prenom}
      </span>
      <span className="select-none text-3xl uppercase font-bold opacity-50">
        {/* {letterLastName}. */}
        {nom && nom}.
      </span>
    </div>
  );
};

export default Name;
