import classNames from "classnames";
import React from "react";

const Tab = ({
  currentTab,
  handleClick,
  index,
}: {
  currentTab: number | null;
  handleClick: (arg: number) => void;
  index: number;
}) => {
  return (
    <section className="w-full max-w-[600px]   text-center radius">
      <section
        onClick={() => {
          handleClick(index);
        }}
        className="border-2 border-white"
      >
        <h1>{index}</h1>
      </section>{" "}
      <div
        className={classNames({
          "h-[50px] w-full border-2 border-red-500 transition-height duration-500 ease":
            currentTab === index,
          "h-0 overflow-hidden w-full transition-height duration-500 ease border-2 border-red-500":
            currentTab !== index,
        })}
      >
        FORM 1{" "}
      </div>
    </section>
  );
};

export default Tab;
