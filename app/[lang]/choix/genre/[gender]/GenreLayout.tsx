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
  const { open: openModal, toggle: toggleModal } = useToggle();
  const { open: openInput, toggle: toggleInput } = useToggle();
  const { allPack, candidatId, useAssociateCandidatsWithPackage } =
    usePackage();
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
        toggleModal={toggleModal}
      />
      <DialogPackage
        openModal={openModal}
        openInput={openInput}
        toggleModal={toggleModal}
        toggleInput={toggleInput}
        allPack={allPack}
        candidatId={candidatId}
        useAssociateCandidatsWithPackage={useAssociateCandidatsWithPackage}
      />
    </section>
  );
};

export default GenreLayout;
