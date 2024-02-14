import { Dictionary } from "@/types/dictionary";
import classNames from "classnames";
import React from "react";
import { CtaList } from "./Physionomie";
import { RoleFilterProps } from "./type";

const RoleFilter = ({
  dictionary,
  currentRole,
  handleClick,
  handleFilter,
}: RoleFilterProps) => {
  return (
    <ul
      className={classNames({
        "max-w-[360px] w-full flex justify-between items-center mx-auto": true,
      })}
    >
      {Object.entries(dictionary?.genre?.page?.role)?.map(([key, value]) => {
        return (
          <CtaList
            key={key}
            cle={key}
            value={value as React.ReactNode}
            handleClick={handleClick}
            handleFilter={handleFilter}
            current={currentRole}
            customStyle="uppercase text-xl md:text-2xl"
          />
        );
      })}
    </ul>
  );
};

export default RoleFilter;
