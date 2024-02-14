import classNames from "classnames";
import React from "react";
import { BsCircle, BsFillCircleFill } from "react-icons/bs";
import ListSubFilter from "./ListSubFilter";
import { CTAListProps, PhysionomieProps } from "./type";

export const Physionomie = ({
  dictionary,
  valuePhysio,
  currentList,
  handleCurrentList,
  handlePhysioQuery,
  router,
  gender,
  pathname,
}: PhysionomieProps) => {
  return (
    <div className="max-w-[450px] w-full flex justify-between items-center uppercase  text-xl ">
      <ListSubFilter
        dictionary={dictionary}
        valuePhysio={valuePhysio}
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
            {valuePhysio["Unique"] ? (
              <BsFillCircleFill
                className="w-6 h-6"
                onClick={(e) => {
                  handlePhysioQuery(false, "Unique");
                  router.push(`/fr/choix/genre/${gender}`);
                }}
              />
            ) : (
              <BsCircle
                className="w-6 h-6"
                onClick={(e) => {
                  handlePhysioQuery(true, "Unique");

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
  onlyMapKey,
  onlyObjectKey,
}: CTAListProps) => {
  const validationSubList = Array.isArray(current)
    ? !current.includes(value as string)
    : current !== cle;
  return (
    <button
      key={cle}
      className="uppercase whitespace-nowrap w-fit"
      onClick={() => {
        handleClick(cle);
        handleFilter && handleFilter(cle);
        if (onlyMapKey) {
          handlePhysioQuery && handlePhysioQuery(value as string, onlyMapKey);
        } else if (onlyObjectKey) {
          handlePhysioQuery && handlePhysioQuery(onlyObjectKey, cle);
        } else {
          handlePhysioQuery && handlePhysioQuery(value as string, cle);
        }
      }}
    >
      <li
        className={classNames({
          [`${`font-medium ${customStyle}`}`]: true,
          "opacity-50 ": validationSubList,
        })}
      >
        {value as React.ReactNode}
      </li>
    </button>
  );
};
