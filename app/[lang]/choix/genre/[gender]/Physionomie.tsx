import { Dictionary } from "@/types/dictionary";
import classNames from "classnames";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";
import { BsCircle, BsFillCircleFill } from "react-icons/bs";
import ListSubFilter from "./ListSubFilter";

export const Physionomie = ({
  dictionary,
  currentPhysio,
  currentList,
  handleCurrentList,
  handlePhysioQuery,
  router,
  gender,
  pathname,
}: {
  dictionary: Dictionary;
  currentPhysio: string[];
  handlePhysioQuery: (value: string | boolean, key: string) => void;
  currentList: string;
  handleCurrentList: (list: string) => void;
  router: AppRouterInstance;
  gender: string;
  pathname: string;
}) => {
  return (
    <div className="max-w-[450px] w-full flex justify-between items-center uppercase  text-xl ">
      <ListSubFilter
        dictionary={dictionary}
        currentPhysio={currentPhysio}
        handlePhysioQuery={handlePhysioQuery}
        handleClick={() => {}}
        currentList={currentList}
        handleCurrentList={handleCurrentList}
      />
      <ul className="relative">
        <CtaList
          key={"Unique"}
          cle={"Unique"}
          value={"Unique"}
          handleClick={handleCurrentList}
          current={currentList}
          customStyle="font-medium text-base md:text-xl"
        />
        {currentList === "Unique" && (
          <ul className="absolute flex flex-col gap-2 z-50 top-[110%] background__grey min-w-min h-fit p-2">
            {currentPhysio.includes("Unique") ? (
              <BsFillCircleFill
                className="w-6 h-6"
                onClick={(e) => {
                  console.log("NOT UNIQUE");
                  router.push(`/fr/choix/genre/${gender}`);
                }}
              />
            ) : (
              <BsCircle
                className="w-6 h-6"
                onClick={(e) => {
                  console.log(" UNIQUE", pathname);

                  router.push(`${pathname}?Unique=true`);
                }}
              />
            )}
          </ul>
        )}
      </ul>
    </div>
  );
};

export const CtaList = ({
  cle,
  value,
  handleClick,
  current,
  customStyle,
  handleFilter,
  handlePhysioQuery,
}: {
  cle: string;
  value: React.ReactNode;
  handleClick: (arg: string) => void;
  current: string | string[];
  customStyle: string;
  handleFilter?: (role: string) => void;
  handlePhysioQuery?: (value: string | boolean, key: string) => void;
}) => {
  const validation = Array.isArray(current)
    ? !current.includes(cle)
    : current !== cle;
  return (
    <button
      key={cle}
      className="uppercase whitespace-nowrap w-fit"
      onClick={() => {
        handleClick(cle);
        handleFilter && handleFilter(cle);
        handlePhysioQuery && handlePhysioQuery(value as string | boolean, cle);
      }}
    >
      <li
        className={classNames({
          [`${`font-medium ${customStyle}`}`]: true,
          "opacity-50": validation,
        })}
      >
        {value as React.ReactNode}
      </li>
    </button>
  );
};
