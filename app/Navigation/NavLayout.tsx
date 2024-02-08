"use client";
import useToggle from "@/hooks/Basic/useToggle";
import React from "react";
import { NavBarComponent } from "./NavBarComponent";
import LocaleSwitcher from "./LocaleSwitcher";
import { Dictionary } from "@/types/dictionary";
import { Locale } from "@/i18n-config";
import Entete from "./Entete";
import classNames from "classnames";
import Image from "next/image";

interface NavLayoutProps {
  dictionary: Dictionary;
  lang: Locale;
}
const NavLayout = ({ dictionary, lang }: NavLayoutProps) => {
  const { toggle, open } = useToggle();

  return (
    <>
      <Entete dictionary={dictionary} open={open} toggle={toggle} />
      <div
        className={classNames({
          " flex flex-col w-full h-fit uppercase absolute top-full left-0 gap-5 p-4 border-b border-white z-50 bg-black md:hidden":
            true,
          "bg-black transition-transform duration-1000 ease-in-out transform translate-x-0":
            open,
          "transition-transform duration-1000 ease-in-out transform -translate-x-full":
            !open,
        })}
      >
        <NavBarComponent dictionary={dictionary} lang={lang} classStyles="" />
        <LocaleSwitcher />
      </div>
      <div className="hidden md:flex w-full h-full  items-center justify-center ">
        <Logo classStyles="hidden xl:block relative w-[250px] h-[66px]" />
        <NavBarComponent dictionary={dictionary} lang={lang} classStyles="" />
        <LocaleSwitcher />
      </div>
    </>
  );
};

export default NavLayout;

type Props = {
  classStyles: string;
};
function Logo({ classStyles }: Props) {
  return (
    <div className={classStyles}>
      <Image
        src="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24R2PBGOA.png"
        alt="logo"
        fill
        sizes="(max-width: 768px) 50%, (max-width: 1200px) 50%, 75%"
        priority
      />
    </div>
  );
}
