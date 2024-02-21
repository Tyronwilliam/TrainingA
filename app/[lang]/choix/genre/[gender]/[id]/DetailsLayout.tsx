import React from "react";
import Name from "../Candidat/Name";
import PhysonomieInfos from "./components/PhysonomieInfos";
import Skills from "./components/Skills";
import { Dictionary } from "@/types/dictionary";
import { FaDownload } from "react-icons/fa";
import { useSession } from "next-auth/react";
import DownloadButton from "../DownloadButton";

const DetailsLayout = ({
  candidat,
  letterLastName,
  dictionary,
  competence,
  videos,
  toggleModal1,
  downloadAllFiles,
}: {
  candidat: any;
  letterLastName: string | undefined;
  dictionary: Dictionary;
  competence: string | null;
  videos: any[];
  toggleModal1: () => void;
  downloadAllFiles: (candidat: any) => void;
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
          // <DownloadButton
          //   dictionary={dictionary}
          //   candidat={candidat}
          //   downloadAllFiles={downloadAllFiles}
          // />
          <button
            className="relative group"
            onClick={() =>
              downloadAllFiles !== undefined && downloadAllFiles(candidat)
            }
          >
            <FaDownload className="w-6 h-6 hover:opacity-55" />
            <span className="hidden group-hover:block radius text-sm top-full left-[-20%]  bg-white text-black p-2 absolute z-50 text-center">
              {dictionary?.general?.zipHelper}
            </span>
          </button>
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
