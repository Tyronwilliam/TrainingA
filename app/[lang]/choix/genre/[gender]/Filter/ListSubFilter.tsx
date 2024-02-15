import { Dictionary } from "@/types/dictionary";
import React from "react";
import { PhysioState } from "../type";
import { CtaList } from "./CtaList";

const ListSubFilter = ({
  dictionary,
  valuePhysio,
  handleClick,
  currentList,
  handleCurrentList,
  handlePhysioQuery,
}: {
  dictionary: Dictionary;
  valuePhysio: PhysioState;
  handleClick: (role: string) => void;
  currentList: string;
  handleCurrentList: (list: string) => void;
  handlePhysioQuery: (value: string, key: string) => void;
}) => {
  return Object.entries(dictionary?.genre?.page?.filter as Object)?.map(
    ([key, value]) => {
      return Object.entries(value?.title)?.map(([innerKey, item]) => {
        return (
          innerKey !== "Unique" && (
            <ul key={innerKey} className="relative">
              <CtaList
                cle={innerKey}
                value={item as React.ReactNode}
                handleClick={handleCurrentList}
                current={currentList}
                customStyle="font-medium text-base md:text-xl"
              />
              {currentList === innerKey && (
                <ul
                  key={key}
                  className=" radius absolute flex flex-col gap-2 z-50 top-[110%] background__grey min-w-min h-fit p-2"
                >
                  {Array.isArray(value?.value) &&
                    innerKey !== "Unique" &&
                    value?.value?.map((subItemKey: string) => {
                      return (
                        <CtaList
                          key={subItemKey}
                          value={subItemKey as React.ReactNode}
                          handleClick={handleClick} //@ts-ignore
                          current={valuePhysio[currentList]}
                          cle={subItemKey as string}
                          customStyle="font-medium text-base md:text-xl"
                          handlePhysioQuery={handlePhysioQuery}
                          onlyMapKey={currentList}
                        />
                      );
                    })}
                  {typeof value?.value === "object" &&
                    innerKey !== "Unique" &&
                    !Array.isArray(value?.value) &&
                    Object.entries(value?.value)?.map(
                      ([keySub, subItemValue]) => {
                        return (
                          <CtaList
                            key={keySub}
                            cle={currentList}
                            value={subItemValue as React.ReactNode}
                            handleClick={handleClick}
                            onlyObjectKey={keySub}
                            //@ts-ignore
                            current={valuePhysio[currentList]}
                            customStyle="font-medium text-base md:text-xl"
                            handlePhysioQuery={handlePhysioQuery}
                          />
                        );
                      }
                    )}
                </ul>
              )}
            </ul>
          )
        );
      });
    }
  );
};

export default ListSubFilter;
