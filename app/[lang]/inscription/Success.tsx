import { Dictionary } from "@/types/dictionary";
import Link from "next/link";
import React from "react";

const Success = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <section className="text-center flex flex-col items-center justify-center gap-6 max-w-[530px] text-lg ">
      <p className="text-2xl"> {dictionary?.inscription?.success?.p1}</p>
      <p> {dictionary?.inscription?.success?.p2}</p>
      <p> {dictionary?.inscription?.success?.p3}</p>
      <p className="text-xl"> {dictionary?.inscription?.success?.p4}</p>
      <Link
        href={"/"}
        className="max-w-[120px]   w-full radius p-2.5"
      >
        <button
          type="button"
          className="boutonSlideCommon shrink-0 text-lg  w-full radius p-2.5 border-[1px] border-white"
        >
          {dictionary?.cta?.accueil}
        </button>
      </Link>
    </section>
  );
};

export default Success;
