import React from "react";

const Name = ({ prenom, nom }: { prenom: string; nom: string | undefined }) => {
  return (
    <div className="flex gap-2">
      <span className="select-none text-3xl uppercase font-bold inline-block max-w-[163px] truncate whitespace-nowrap text-ellipsis">
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
