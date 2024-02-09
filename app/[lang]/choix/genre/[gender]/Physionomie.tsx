import { Dictionary } from "@/types/dictionary";
import classNames from "classnames";
import React from "react";
import { BsCircle, BsFillCircleFill } from "react-icons/bs";

const Physionomie = ({
  dictionary,
  currentPhysio,
  handleClick,
  currentList,
  handleCurrentList,
}: {
  dictionary: Dictionary;
  currentPhysio: string[];
  handleClick: (role: string) => void;
  currentList: string;
  handleCurrentList: (list: string) => void;
}) => {
  return (
    <div className="max-w-[450px] w-full flex justify-between items-center uppercase  text-xl ">
      {Object.entries(dictionary?.genre?.page?.filter as Object)?.map(
        ([key, value]) => {
          //@ts-ignore
          return Object.entries(value?.title)?.map(([key, item]) => {
            return (
              <ul key={key} className="relative">
                <CtaList
                  cle={key}
                  value={item as React.ReactNode}
                  handleClick={handleCurrentList}
                  current={currentList}
                />
                {currentList === key && (
                  <ul className="absolute flex flex-col gap-2 z-50 top-[110%] background__grey min-w-min h-fit p-2">
                    {/* @ts-ignore */}
                    {Array.isArray(value?.value) &&
                      key !== "Unique" &&
                      value?.value?.map((subItemKey: string, index: number) => {
                        return (
                          <CtaList
                            key={subItemKey}
                            value={subItemKey as React.ReactNode}
                            handleClick={handleClick}
                            current={currentPhysio}
                            cle={subItemKey}
                          />
                        );
                      })}
                    {/* @ts-ignore */}
                    {typeof value?.value === "object" &&
                      key !== "Unique" &&
                      Object.entries(value?.value)?.map(
                        ([keySub, subItemValue]) => {
                          return (
                            <CtaList
                              key={keySub}
                              cle={keySub}
                              value={subItemValue as React.ReactNode}
                              handleClick={handleClick}
                              current={currentPhysio}
                            />
                          );
                        }
                      )}{" "}
                  </ul>
                )}
              </ul>
            );
          });
        }
      )}{" "}
      {currentList === "Unique" && !currentPhysio.includes("Unique") ? (
        <BsCircle className="w-6 h-6" onClick={() => handleClick("Unique")} />
      ) : (
        <BsFillCircleFill
          className="w-6 h-6"
          onClick={() => handleClick("Unique")}
        />
      )}
    </div>
  );
};

export default Physionomie;

const CtaList = ({
  cle,
  value,
  handleClick,
  current,
}: {
  cle: string;
  value: React.ReactNode;
  handleClick: (arg: string) => void;
  current: string | string[];
}) => {
  const validation = Array.isArray(current)
    ? !current.includes(cle)
    : current !== cle;
  return (
    <button
      className="uppercase whitespace-nowrap w-fit"
      onClick={() => handleClick(cle)}
    >
      <li
        key={cle}
        className={classNames({
          "font-medium text-base md:text-xl": true,
          "opacity-50": validation,
        })}
      >
        {value as React.ReactNode}
      </li>
    </button>
  );
};
