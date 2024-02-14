"use client";
import useFilter from "@/hooks/Filter/useFilter";
import { Dictionary } from "@/types/dictionary";
import Image from "next/image";
import { usePathname } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { Physionomie } from "./Physionomie";
import RoleFilter from "./RoleFilter";

const GenreLayout = ({
  talents,
  metaInitial,
  dictionary,
  gender,
}: {
  talents: any;
  metaInitial: any;
  dictionary: Dictionary;
  gender: string;
}) => {
  const pathname = usePathname();
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
    router,
    valuePhysio,
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
          valuePhysio={valuePhysio}
          handlePhysioQuery={handlePhysioQuery}
          handleCurrentList={handleCurrentList}
          currentList={currentList}
          router={router}
          pathname={pathname}
          gender={gender}
        />
      </section>
      {/* TALENT LAYOUT */}
      <section className="flex flex-col">
        <section className="flex flex-wrap">
          <InfiniteScroll
            dataLength={candidat?.length ? candidat?.length : 0}
            next={loadMoreUsers}
            hasMore={meta > candidat?.length}
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
