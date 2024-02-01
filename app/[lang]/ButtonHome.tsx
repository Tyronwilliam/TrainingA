"use client";
import { Dictionary } from "@/types/dictionary";
import { signOut } from "next-auth/react";
import Link from "next/link";

type ButtonHomeProps = {
  session: any;
  dictionary: Dictionary;
};
export function ButtonHome({ dictionary, session }: ButtonHomeProps) {
  return session ? (
    <button
      className="boutonSlide"
      style={{ width: "fit-content" }}
      onClick={() => signOut({ redirect: false })}
    >
      {dictionary.home.logout}
    </button>
  ) : (
    <Link href={dictionary.home.bouton[0].link}>
      <button className="absolute top-[83%] left-1/2 transform -translate-x-1/2 text-black bg-white text-2xl w-[220px] py-6 px-[30px] tracking-extraWide md:p-30  uppercase text-center rounded-larger boutonSlide">
        {dictionary.home.bouton[0].label}
      </button>
    </Link>
  );
}
