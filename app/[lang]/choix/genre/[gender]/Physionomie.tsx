import classNames from "classnames";
import React from "react";
import { BsCircle, BsFillCircleFill } from "react-icons/bs";
import ListSubFilter from "./ListSubFilter";
import { CTAListProps, PhysionomieProps } from "./type";
import { CtaList } from "./CtaList";

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
