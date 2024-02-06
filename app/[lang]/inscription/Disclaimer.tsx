import { Dictionary } from "@/types/dictionary";
import React from "react";

const Disclaimer = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <section className="text-center flex flex-col items-center justify-center gap-6 max-w-[530px]">
      <h1 className="text-3xl font-bold	">
        {dictionary?.inscription?.disclaimer?.h1}
      </h1>
      <p className="text-xl	font-bold">
        {dictionary?.inscription?.disclaimer?.p3}
      </p>
      <div>
        <p className="text-lg inline-block max-w-[450px]">
          {dictionary?.inscription?.disclaimer?.p1}
        </p>
        <p className="text-lg	">{dictionary?.inscription?.disclaimer?.p4}</p>
      </div>
      <p className="text-lg inline-block max-w-[420px]">
        {dictionary?.inscription?.disclaimer?.p2}
      </p>
    </section>
  );
};

export default Disclaimer;
