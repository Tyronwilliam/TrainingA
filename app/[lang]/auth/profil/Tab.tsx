import classNames from "classnames";
import React, { ReactNode } from "react";
import { TabProps } from "./type";

const Tab = ({
  currentTab,
  handleClick,
  index,
  children,
  title,
  formik,
}: TabProps) => {

  return (
    <section className="w-full max-w-[700px]  px-4 md:px-0  radius custom__border">
      <div
        onClick={() => {
          handleClick(index);
        }}
        className="uppercase mt-4 radius text-lg text-center background__grey h-16 p-5 cursor-pointer  hover:opacity-80 flex items-center justify-center"
      >
        <h1>{title}</h1>
    
      </div>
      <div
        className={classNames({
          "px-2 sm:px-0 flex background__grey  flex-wrap justify-center  max-w-[700px] m-auto  md:flex-row md:flex-wrap gap-6 transition-maxHeight duration-1000 ease":
            true,
          "max-h-[3000px]  w-full py-5": currentTab === index,
          "max-h-0 overflow-hidden w-full": currentTab !== index,
        })}
      >
        {children}
      </div>
    </section>
  );
};

export default Tab;
