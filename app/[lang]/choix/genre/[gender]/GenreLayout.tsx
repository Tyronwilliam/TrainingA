"use client";
import Image from "next/image";
import React, { useState } from "react";
import { getCandidat } from "./action";
import InfiniteScroll from "react-infinite-scroll-component";
import RoleFilter from "./RoleFilter";
import { Dictionary } from "@/types/dictionary";
import { Physionomie } from "./Physionomie";
import useCustomRouter from "@/hooks/Basic/useCustomRouter";
import useFilter from "@/hooks/Filter/useFilter";

const GenreLayout = ({
  talents,
  metaInitial,
  dictionary,
}: {
  talents: any;
  metaInitial: any;
  dictionary: Dictionary;
}) => {
  const {
    loadMoreUsers,
    handleFilter,
    handlePhysioQuery,
    handleCurrentList,
    handleRole,
    meta,
    currentList,
    currentPhysio,
    currentRole,
    candidat,
  } = useFilter(talents, metaInitial);

  return (
    <section>
      {/* Filtre */}
      <section className="w-full px-3 flex flex-col gap-8">
        <RoleFilter
          dictionary={dictionary}
          currentRole={currentRole}
          handleClick={handleRole}
          handleFilter={handleFilter}
        />
        <Physionomie
          dictionary={dictionary}
          currentPhysio={currentPhysio}
          handlePhysioQuery={handlePhysioQuery}
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
            hasMore={meta > candidat.length}
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
