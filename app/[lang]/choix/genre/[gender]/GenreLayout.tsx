"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getCandidat } from "./action";
import InfiniteScroll from "react-infinite-scroll-component";
import RoleFilter from "./RoleFilter";
import { Dictionary } from "@/types/dictionary";
import Physionomie from "./Physionomie";

const GenreLayout = ({
  talents,
  meta,
  dictionary,
}: {
  talents: any;
  meta: any;
  dictionary: Dictionary;
}) => {
  const [candidat, setCandidat] = useState(talents);
  const [age, setAge] = useState<number | null>(null);
  const [currentRole, setCurrentRole] = useState<string>("Tous");
  const [currentPhysio, setCurrentPhysio] = useState<string[]>([]);
  const [currentList, setCurrentList] = useState("");
  const loadMoreUsers = async () => {
    const response = await getCandidat("Men", candidat?.length);
    const data = response?.data;
    setCandidat((prev: []) => [...prev, ...data]);
  };
  const handleRole = (role: string) => {
    setCurrentRole(role);
  };
  const handleCurrentList = (arg: string) => {
    if (currentList === arg) {
      setCurrentList("");
    } else {
      setCurrentList(arg);
    }
  };
  const handlePhysio = (arg: string) => {
    const isSelected = currentPhysio.includes(arg);
    console.log(arg, "CLICL SUIBITEM");
    if (isSelected) {
      const newArray = currentPhysio.filter(
        (selectedItem) => selectedItem !== arg
      );
      console.log(newArray, "WHY ");
      setCurrentPhysio(newArray);
    } else {
      if (currentPhysio.length < 2) {
        const newArray = [...currentPhysio, arg];
        setCurrentPhysio(newArray);
      }
    }
  };
  console.log(currentPhysio, "CURRENT PHYSIO");
  return (
    <section>
      {/* Filtre */}
      <section className="w-full px-3 flex flex-col gap-8">
        <RoleFilter
          dictionary={dictionary}
          currentRole={currentRole}
          handleClick={handleRole}
        />
        <Physionomie
          dictionary={dictionary}
          currentPhysio={currentPhysio}
          handleClick={handlePhysio}
          handleCurrentList={handleCurrentList}
          currentList={currentList}
        />
      </section>
      {/* TALENT LAYOUT */}
      <section className="flex flex-col">
        <section className="flex flex-wrap">
          <InfiniteScroll
            dataLength={candidat.length}
            next={loadMoreUsers}
            hasMore={meta?.pagination?.total > candidat.length}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {candidat?.map((talent: any) => {
              const image =
                talent?.attributes?.Photo_de_presentation?.data?.attributes
                  ?.url;
              return (
                <div
                  key={talent?.id}
                  className={`relative w-full h-auto mx-auto max-w-[333.3px] max-h-[435px] cursor-pointer overflow-hidden shrink-0 `}
                >
                  {talent?.attributes?.Prenom}
                  <Image
                    src={`${image}`}
                    alt="Modèle"
                    priority
                    width={333}
                    height={500}
                    quality={80}
                    className="object-cover object-top w-full h-auto"
                  />{" "}
                </div>
              );
            })}{" "}
          </InfiniteScroll>
        </section>
      </section>
    </section>
  );
};

export default GenreLayout;
