"use client";
import { Dictionary } from "@/types/dictionary";
import Link from "next/link";
import React from "react";
import { BiCopyright } from "react-icons/bi";

const Footer = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <footer className="shrink-0 flex flex-col gap-2 items-center justify-center text-center text-sm">
      <div className="flex justify-between gap-10">
        <div className="flex items-center opacity-60 hover:opacity-100">
          <BiCopyright />
          <Link href={"/"}>{dictionary?.footer?.termcondition}</Link>
        </div>
        <div className="opacity-60 hover:opacity-100">
          <Link href={"/"}>{dictionary?.header?.title}</Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 items-center justify-center">
        <span className="opacity-60">{dictionary?.footer?.google?.span1} </span>
        <Link
          href="https://policies.google.com/privacy"
          className="opacity-60 hover:opacity-100"
        >
          {dictionary?.footer?.google?.link1}
        </Link>
        <span className="opacity-60"> {dictionary?.footer?.google?.and} </span>
        <Link
          href="https://policies.google.com/terms"
          className="opacity-60 hover:opacity-100"
        >
          {dictionary?.footer?.google?.link2}
        </Link>
        <span className="opacity-60">{dictionary?.footer?.google?.span2}</span>
      </div>
    </footer>
  );
};

export default Footer;
