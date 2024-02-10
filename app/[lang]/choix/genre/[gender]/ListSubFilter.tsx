import { Dictionary } from "@/types/dictionary";
import React from "react";
import { CtaList } from "./Physionomie";

const ListSubFilter = ({
  dictionary,
  currentPhysio,
  handleClick,
  currentList,
  handleCurrentList,
  handlePhysioQuery,
}: {
  dictionary: Dictionary;
  currentPhysio: string[];
  handleClick: (role: string) => void;
  currentList: string;
  handleCurrentList: (list: string) => void;
  handlePhysioQuery: (value: string | boolean, key: string) => void;
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
                        <React.Fragment key={subItemKey}>
                          <CtaList
                            value={subItemKey as React.ReactNode}
                            handleClick={handleClick}
                            current={currentPhysio}
                            cle={currentList}
                            customStyle="font-medium text-base md:text-xl"
                            handlePhysioQuery={handlePhysioQuery}
                          />
                        </React.Fragment>
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
                            current={currentPhysio}
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
