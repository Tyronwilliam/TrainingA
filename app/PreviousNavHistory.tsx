"use client";

import usePreviousHistory from "@/hooks/Basic/usePreviousHistory";
import React from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function PreviousNavHistory({
  classStyles,
}: {
  classStyles?: string;
}) {
  const goBack = usePreviousHistory();
  return (
    <button
      className={`flex absolute top-[3%] left-[5%] border-none cursor-pointer bg-none gap-1 items-center transition-all z-50 text-lg hover:text-hoverLightGrey uppercase ${classStyles}`}
      onClick={goBack}
    >
      <HiOutlineArrowNarrowLeft className="arrow_back" />
      Back
    </button>
  );
}
