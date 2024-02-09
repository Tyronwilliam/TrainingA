import { Dictionary } from "@/types/dictionary";
import classNames from "classnames";
import React from "react";

const RoleFilter = ({
  dictionary,
  currentRole,
  handleClick,
}: {
  dictionary: Dictionary;
  currentRole: string;
  handleClick: (role: string) => void;
}) => {
  return (
    <ul
      className={classNames({
        "max-w-[360px] w-full flex justify-between items-center    mx-auto":
          true,
      })}
    >
      {Object.entries(dictionary?.genre?.page?.role)?.map(([key, value]) => {
        return (
          <li
            className={classNames({
              "font-medium ": true,
              "opacity-50": currentRole !== key,
            })}
            key={key}
          >
            <button
              className="uppercase text-xl md:text-2xl"
              onClick={() => handleClick(key)}
            >
              {value as React.ReactNode}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default RoleFilter;
// "max-w-[360px] w-full  flex justify-between items-center uppercase  text-2xl mx-auto"
