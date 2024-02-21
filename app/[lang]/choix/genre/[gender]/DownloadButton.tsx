import { Dictionary } from "@/types/dictionary";
import React from "react";
import { FaDownload } from "react-icons/fa";

const DownloadButton = ({
  downloadAllFiles,
  candidat,
  dictionary,
}: {
  candidat: any;
  dictionary: Dictionary;
  downloadAllFiles: (candidat: any) => void;
}) => {
  return (
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
  );
};

export default DownloadButton;
