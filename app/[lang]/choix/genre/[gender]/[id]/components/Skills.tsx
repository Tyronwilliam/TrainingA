import { Dictionary } from "@/types/dictionary";
import React from "react";

const Skills = ({
  dictionary,
  competence,
}: {
  dictionary: Dictionary;
  competence: string | null;
}) => {
  return (
    competence &&
    competence !== "" && (
      <div>
        <span>{dictionary?.singleTalent?.page?.skills}:</span>
        <p>{competence}</p>
      </div>
    )
  );
};

export default Skills;
