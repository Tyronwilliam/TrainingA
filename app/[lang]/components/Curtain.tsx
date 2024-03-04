"use client";
import Image from "next/image";
import React from "react";
import classNames from "classnames";
import { usePreferences } from "@/hooks/Basic/usePreferencesProvider";

const Curtain = () => {
  const { split, handleSplit } = usePreferences();
  return (
    <>
      <div
        className={classNames({
          "absolute w-full top-0 left-0  h-2/4  bg-black z-50": !split,
          "absolute w-full top-0 left-0 h-0 transition-all duration-1000 ease-in-out -z-0":
            split,
        })}
      ></div>
      <div
        className={classNames({
          "absolute w-full bottom-0 left-0 h-2/4 bg-black z-50 transition-height duration-150 ease-in-out":
            !split,
          "absolute w-full h-0 bottom-0 left-0 transition-all duration-1000 ease-in-out -z-0":
            split,
        })}
      ></div>{" "}
      <div
        onClick={handleSplit}
        data-cy="curtain"
        className={classNames({
          "absolute max-w-[800px] w-full h-full max-h-[250px] top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] cursor-pointer":
            true,
          "transition-all duration-1000 ease-in-out opacity-0 w-0 h-0 cursor-default z-0":
            split,
          "z-50 ": !split,
        })}
      >
        <Image
          className={classNames({
            "w-full h-full object-contain": true,
            "z-0 cursor-default": split,
          })}
          src="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/GRAZIANI+SANS+FOND.png"
          fill
          priority={true}
          alt="Agence Graziani"
          sizes="(max-width: 800px) 75vw, (max-width: 1200px) 75vw, 75vw"
        />
      </div>
    </>
  );
};

export default Curtain;
