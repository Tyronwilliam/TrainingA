"use client";
import useFilter from "@/hooks/Filter/useFilter";
import { Dictionary } from "@/types/dictionary";
import { usePathname } from "next/navigation";
import InfniteScrollDisplay from "./Candidat/InfniteScrollDisplay";
import { Physionomie } from "./Filter/Physionomie";
import RoleFilter from "./Filter/RoleFilter";

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
      <InfniteScrollDisplay
        candidat={candidat}
        loadMoreUsers={loadMoreUsers}
        meta={meta}
      />
    </section>
  );
};

export default GenreLayout;
