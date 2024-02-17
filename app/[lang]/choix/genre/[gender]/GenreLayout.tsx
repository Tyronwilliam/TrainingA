"use client";
import useFilter from "@/hooks/Filter/useFilter";
import { Dictionary } from "@/types/dictionary";
import { usePathname } from "next/navigation";
import InfniteScrollDisplay from "./Candidat/InfniteScrollDisplay";
import { PhysionomieFilter } from "./Filter/PhysionomieFilter";
import RoleFilter from "./Filter/RoleFilter";
import DialogPackage from "@/app/[lang]/components/package/DialogPackage";
import useToggle from "@/hooks/Basic/useToggle";
import { usePackage } from "@/hooks/Package/usePackage";

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
    currentRole,
    candidat,
    router,
    valuePhysio,
  } = useFilter(talents, metaInitial);
  const { open, toggle } = useToggle();
  const { allPack, candidatId } = usePackage();
  return (
    <section>
      <section className="w-full px-3 flex flex-col gap-8 max-w-[1100px] mx-auto md:px-8">
        <RoleFilter
          dictionary={dictionary}
          currentRole={currentRole}
          handleClick={handleRole}
          handleFilter={handleFilter}
        />
        <PhysionomieFilter
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
      <InfniteScrollDisplay
        candidat={candidat}
        loadMoreUsers={loadMoreUsers}
        meta={meta}
        pathname={pathname}
        toggle={toggle}
      />
      <DialogPackage
        open={open}
        toggle={toggle}
        allPack={allPack}
        candidatId={candidatId}
      />
    </section>
  );
};

export default GenreLayout;
