"use client";
import DialogPackage from "@/app/[lang]/components/package/DialogPackage";
import Modal from "@/app/[lang]/components/package/Modal";
import PackageListLayout from "@/app/[lang]/components/package/PackageListLayout";
import Formulaire from "@/app/[lang]/components/package/form/Formulaire";
import TrombiLayout from "@/app/[lang]/components/package/trombi/TrombiLayout";
import useToggle from "@/hooks/Basic/useToggle";
import useFilter, { Gender } from "@/hooks/Filter/useFilter";
import { usePackage } from "@/hooks/Package/usePackage";
import { Dictionary } from "@/types/dictionary";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import BackToTop from "./BackToTop";
import InfniteScrollDisplay from "./Candidat/InfniteScrollDisplay";
import PackageButton from "./Filter/PackageButton";
import { PhysionomieFilter } from "./Filter/PhysionomieFilter";
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
  gender: Gender;
}) => {
  const { data: session } = useSession();
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
  } = useFilter(talents, metaInitial, gender);
  const {
    allPack,
    candidatId,
    connectCandidatsAndPackage,
    handleInputChange,
    packName,
    setPackName,
    useCreatePackage,
    fetchPackageById,
    editPackageName,
    openPackId,
    setOpenPackId,
    handleTogglePack,
    currentPack,
  } = usePackage();
  const { open: openModal, toggle: toggleModal } = useToggle();
  const { open: openInput, toggle: toggleInput } = useToggle();
  const { open: openModalOne, toggle: toggleModalOne } = useToggle();
  const { open: openModalForm, toggle: toggleModalForm } = useToggle();
  const { open: openModalTable, toggle: toggleModalTable } = useToggle();
  const { open: isCasting, toggle: toggleIsCasting } = useToggle();
  const pathname = usePathname();
  const tableTh = dictionary?.genre?.page?.table;
  const handleToggle = (packId: number, packNom?: string) => {
    packNom && setPackName("");
    toggleInput();
    setOpenPackId(openPackId === packId ? null : packId);
  };
  const handlePackageButton = () => {
    fetchPackageById();
    toggleModalOne();
  };
  useEffect(() => {
    fetchPackageById();
  }, []);
  return (
    <section className="min-h-[400px]">
      <BackToTop />

      <section className="w-full px-3 flex flex-col gap-8 max-w-[1100px] mx-auto md:px-8">
        <div>
          <RoleFilter
            dictionary={dictionary}
            currentRole={currentRole}
            handleClick={handleRole}
            handleFilter={handleFilter}
          />
        </div>
        {/* @ts-ignore */}
        {session?.user?.role === "Admin" || session?.user.filtre ? (
          <div className="flex justify-between flex-wrap gap-2">
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
            <PackageButton onClick={handlePackageButton} />
          </div>
        ) : null}
      </section>
      <InfniteScrollDisplay
        candidat={candidat}
        loadMoreUsers={loadMoreUsers}
        meta={meta}
        pathname={pathname}
        toggleModal={toggleModal}
        dictionary={dictionary}
      />
      <DialogPackage
        openModal={openModal}
        openInput={openInput}
        toggleModal={toggleModal}
        toggleInput={toggleInput}
        allPack={allPack}
        candidatId={candidatId}
        connectCandidatsAndPackage={connectCandidatsAndPackage}
        handleInputChange={handleInputChange}
        packName={packName}
        useCreatePackage={useCreatePackage}
        dictionary={dictionary}
      />
      <Modal
        open={openModalOne}
        toggle={toggleModalOne}
        classSection="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        classDialog="text-white bg-black border-[1px] border-gray-800 radius w-[90%] max-w-[666px] min-w-64 flex flex-col gap-4 p-5 translate-y-[-40%] md:translate-y-0"
        classIcone="z-50 absolute right-1 top-2 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
      >
        <PackageListLayout
          allPack={allPack}
          openPackId={openPackId}
          handleToggle={handleToggle}
          handleInputChange={handleInputChange}
          editPackageName={editPackageName}
          handleTogglePack={handleTogglePack}
          packName={packName}
          dictionary={dictionary}
          toggleModalForm={toggleModalForm}
          toggleModalTable={toggleModalTable}
        />
      </Modal>
      <Modal
        open={openModalForm}
        toggle={toggleModalForm}
        classSection="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        classDialog="max-h-[500px] overflow-y-scroll text-white bg-black border-[1px] border-gray-800 radius w-[90%] max-w-[666px] min-w-64 flex flex-col gap-4 p-5 translate-y-[-30%] md:translate-y-0"
        classIcone="z-50 absolute right-1 top-2 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
      >
        <Formulaire dictionary={dictionary} currentPack={currentPack} />
      </Modal>
      <TrombiLayout
        openModalTable={openModalTable}
        toggleModalTable={toggleModalTable}
        tableTh={tableTh}
        currentPack={currentPack}
        toggleIsCasting={toggleIsCasting}
        isCasting={isCasting}
      />
    </section>
  );
};

export default GenreLayout;
