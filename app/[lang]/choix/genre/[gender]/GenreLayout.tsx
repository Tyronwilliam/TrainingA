"use client";
import CandidateTable from "@/app/[lang]/components/package/CandidateTable";
import DialogPackage from "@/app/[lang]/components/package/DialogPackage";
import NewItemForm from "@/app/[lang]/components/package/NewItemForm";
import useToggle from "@/hooks/Basic/useToggle";
import useFilter from "@/hooks/Filter/useFilter";
import { usePackage } from "@/hooks/Package/usePackage";
import { Dictionary } from "@/types/dictionary";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import InfniteScrollDisplay from "./Candidat/InfniteScrollDisplay";
import { PhysionomieFilter } from "./Filter/PhysionomieFilter";
import RoleFilter from "./Filter/RoleFilter";
import PackageItem from "@/app/[lang]/components/package/PackageItem";
import PackageListLayout from "@/app/[lang]/components/package/PackageListLayout";

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
  const { open: openModalOne, toggle: toggleModalOne } = useToggle();
  const {
    allPack,
    candidatId,
    useAssociateCandidatsWithPackage,
    handleInputChange,
    packName,
    setPackName,
    useCreatePackage,
    fetchPackageById,
    useUpdatePackageName,
    openPackId,
    setOpenPackId,
    handleTogglePack,
  } = usePackage();

  const handleToggle = (packId: number, packNom?: string) => {
    packNom && setPackName(packNom);
    toggleInput();
    setOpenPackId(openPackId === packId ? null : packId);
  };
  return (
    <section>
      <section className="w-full px-3 flex flex-col gap-8 max-w-[1100px] mx-auto md:px-8">
        <RoleFilter
          dictionary={dictionary}
          currentRole={currentRole}
          handleClick={handleRole}
          handleFilter={handleFilter}
        />
        <div className="flex  justify-between flex-wrap gap-2">
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
          <button
            onClick={() => {
              fetchPackageById();
              toggleModalOne();
            }}
            className="font-medium text-base md:text-xl uppercase "
          >
            <li>Package</li>
          </button>
        </div>
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
        handleInputChange={handleInputChange}
        packName={packName}
        useCreatePackage={useCreatePackage}
      />
      {openModalOne && (
        <section className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <dialog
            open={openModalOne}
            className="text-white bg-black border-[1px] border-gray-800 radius w-[90%] max-w-[666px] min-w-64 flex flex-col gap-4 p-5"
          >
            <AiFillCloseCircle
              className="z-50 absolute right-1 top-2 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
              onClick={() => {
                toggleModalOne();
              }}
            />
            <PackageListLayout
              allPack={allPack}
              openPackId={openPackId}
              handleToggle={handleToggle}
              handleInputChange={handleInputChange}
              useUpdatePackageName={useUpdatePackageName}
              handleTogglePack={handleTogglePack}
              packName={packName}
            />
          </dialog>
        </section>
      )}
    </section>
  );
};

export default GenreLayout;
