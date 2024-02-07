"use client";
import { useState } from "react";
import Tab from "./Tab";

const excludeField = [
  "email",
  "password",
  "nomDeNaissance",
  "firstname",
  "gender",
  "dateOfBirth",
  "birthCity",
  "birthPostal",
  "birthCountry",
  "nationality",
  "yeux",
  "origine",
  "photodepresentation",
  "autresphotos",
  "autresphotos",

];

// MEC OUBLIE PAS DE FAIRE LA FONCTION DANS ISNCRIPTION SI LUSER EXISTE DEJA
// et de le logguer
const ProfilLayout = () => {
  const [currentTab, setCurrentTab] = useState<number | null>(null);

  const handleTab = (tab: number | null) => {
    if (currentTab === tab) {
      // If the same tab is clicked again, close the dropdown
      setCurrentTab(null);
    } else {
      // If a different tab is clicked, set the currentTab and then toggle
      setCurrentTab(tab);
    }
  };

  console.log(currentTab);
  return (
    <section className="flex flex-col w-full items-center justify-center ">
      <Tab currentTab={currentTab} handleClick={handleTab} index={0} />
      <Tab currentTab={currentTab} handleClick={handleTab} index={1} />
      <Tab currentTab={currentTab} handleClick={handleTab} index={2} />
    </section>
  );
};

export default ProfilLayout;
