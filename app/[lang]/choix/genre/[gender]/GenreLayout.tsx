"use client";
import DialogPackage from "@/app/[lang]/components/package/DialogPackage";
import Modal from "@/app/[lang]/components/package/Modal";
import PackageListLayout from "@/app/[lang]/components/package/PackageListLayout";
import Formulaire from "@/app/[lang]/components/package/form/Formulaire";
import useToggle from "@/hooks/Basic/useToggle";
import useFilter from "@/hooks/Filter/useFilter";
import { usePackage } from "@/hooks/Package/usePackage";
import { Dictionary } from "@/types/dictionary";
import { usePathname } from "next/navigation";
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
  const { open: openModalForm, toggle: toggleModalForm } = useToggle();
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
    currentPack,
  } = usePackage();

  const handleToggle = (packId: number, packNom?: string) => {
    packNom && setPackName(packNom);
    toggleInput();
    setOpenPackId(openPackId === packId ? null : packId);
  };
  const handlePackageButton = () => {
    fetchPackageById();
    toggleModalOne();
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
          <PackageButton onClick={handlePackageButton} />
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
        dictionary={dictionary}
      />
      <Modal
        open={openModalOne}
        toggle={toggleModalOne}
        classSection="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        classDialog="text-white bg-black border-[1px] border-gray-800 radius w-[90%] max-w-[666px] min-w-64 flex flex-col gap-4 p-5"
        classIcone="z-50 absolute right-1 top-2 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
      >
        <PackageListLayout
          allPack={allPack}
          openPackId={openPackId}
          handleToggle={handleToggle}
          handleInputChange={handleInputChange}
          useUpdatePackageName={useUpdatePackageName}
          handleTogglePack={handleTogglePack}
          packName={packName}
          dictionary={dictionary}
          toggleModalForm={toggleModalForm}
        />
      </Modal>
      <Modal
        open={openModalForm}
        toggle={toggleModalForm}
        classSection="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        classDialog="max-h-[500px] overflow-y-scroll text-white bg-black border-[1px] border-gray-800 radius w-[90%] max-w-[666px] min-w-64 flex flex-col gap-4 p-5"
        classIcone="z-50 absolute right-1 top-2 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
      >
        <Formulaire dictionary={dictionary} currentPack={currentPack} />
      </Modal>
    </section>
  );
};

export default GenreLayout;
