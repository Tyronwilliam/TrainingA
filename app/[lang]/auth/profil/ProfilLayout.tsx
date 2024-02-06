"use client";
import useToggle from "@/hooks/Basic/useToggle";
import classNames from "classnames";
import React, { useState } from "react";
import Tab from "./Tab";

const ProfilLayout = () => {
  const { open, toggle } = useToggle();
  const [currentTab, setCurrentTab] = useState<number | null>(null);

  const handleTab = (tab: number | null) => {
    if (currentTab === tab) {
      // If the same tab is clicked again, close the dropdown
      toggle();
      setCurrentTab(null);
    } else {
      // If a different tab is clicked, set the currentTab and then toggle
      setCurrentTab(tab);
      toggle();
    }
  };

  console.log(currentTab);
  return (
    <section className="flex flex-col w-full items-center justify-center ">
      <Tab
        open={open}
        currentTab={currentTab}
        handleClick={handleTab}
        index={0}
      />
      <Tab
        open={open}
        currentTab={currentTab}
        handleClick={handleTab}
        index={1}
      />
      <Tab
        open={open}
        currentTab={currentTab}
        handleClick={handleTab}
        index={2}
      />
    </section>
  );
};

export default ProfilLayout;
