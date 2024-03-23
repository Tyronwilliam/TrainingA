import { Dictionary } from "@/types/dictionary";
import { useSession } from "next-auth/react";
import Name from "../Candidat/Name";
import DownloadButton from "../DownloadButton";
import PhysonomieInfos from "./components/PhysonomieInfos";
import Skills from "./components/Skills";

const DetailsLayout = ({
  candidat,
  letterLastName,
  dictionary,
  competence,
  videos,
  toggleModal1,
  downloadAllFiles,
  isLoadFile,
}: {
  candidat: any;
  letterLastName: string | undefined;
  dictionary: Dictionary;
  competence: string | null;
  videos: any[];
  toggleModal1: () => void;
  downloadAllFiles: (candidat: any, packName: string | null) => void;
  isLoadFile: boolean;
}) => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col justify-between gap-5 h-fit md:max-h-[540px] md:gap-8 w-full max-w-[333.3px] ">
      <div className="flex gap-2">
        <Name
          prenom={candidat?.attributes?.Prenom}
          nom={letterLastName}
          classStyle="max-w-[380px] text-4xl"
          containerStyle="items-center justify-center md:items-start md:justify-start"
        />
        {/* @ts-ignore */}
        {session?.user?.role === "Admin" && (
          <DownloadButton
            dictionary={dictionary}
            candidat={candidat}
            downloadAllFiles={downloadAllFiles}
            packName={null}
            iconeClass="w-6 h-6"
            isLoadFile={isLoadFile}
          />
        )}
      </div>
      <PhysonomieInfos dictionary={dictionary} candidat={candidat} />
      <Skills dictionary={dictionary} competence={competence} />
      {videos?.length > 0 && (
        <button
          type="button"
          onClick={toggleModal1}
          className="w-fit  font-bold text-xl extraWide uppercase hover:opacity-50 transition-all duration-200 ease-out"
        >
          {dictionary?.singleTalent?.page?.videos}
        </button>
      )}
    </div>
  );
};

export default DetailsLayout;
