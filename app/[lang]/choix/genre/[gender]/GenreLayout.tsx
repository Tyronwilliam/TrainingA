"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getCandidat } from "./action";

const NUMBER_OF_USERS_TO_FETCH = 2;

const GenreLayout = ({ talents, meta }: { talents: any; meta: any }) => {
  const [offset, setOffset] = useState(NUMBER_OF_USERS_TO_FETCH);
  const [candidat, setCandidat] = useState(talents);
  const { ref, inView } = useInView();

  const loadMoreUsers = async () => {
    // Check if there is more data to fetch based on pagination info
    const totalPages = Math.ceil(
      meta.pagination.total / NUMBER_OF_USERS_TO_FETCH
    );

    if (offset <= totalPages) {
      const apiUsers = await getCandidat("Men", offset);
      console.log(apiUsers, "USER API");
      // Check if new data was received
      if (apiUsers?.data?.length > 0) {
        const newDisplay = [...candidat, ...apiUsers?.data];
        setCandidat(newDisplay);
        const newPage = offset + 1;
        setOffset(newPage);
      } else {
        console.log("No more data available");
      }
    } else {
      console.log("All data has been loaded");
    }
  };
  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);

  return (
    <section>
      {/* Filtre */}
      <div>Filtre</div>
      {/* TALENT LAYOUT */}
      <section className="flex flex-col">
        <section className="flex flex-wrap">
          {candidat?.map((talent: any) => {
            const image =
              talent?.attributes?.Photo_de_presentation?.data?.attributes?.url;
            return (
              <div
                key={talent?.id}
                className={`relative w-full h-auto mx-auto max-w-[333.3px] max-h-[435px] cursor-pointer overflow-hidden shrink-0 `}
              >
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
        </section>
        <div ref={ref}>Loading...</div>
      </section>
    </section>
  );
};

export default GenreLayout;
