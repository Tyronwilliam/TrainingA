import { MouseEvent } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import generatePDF from "react-to-pdf";
import Table from "./Table";
type TableHeader = {
  label: string;
  admin: boolean;
};
interface Candidate {
  id: number;
  data: any;
}

interface Attributes {
  Nom: string;
  candidats: {
    data: Candidate[];
  };
}

export interface CurrentPackProps {
  attributes: Attributes;
}

export type TableTh = Record<string, TableHeader>;
const TrombiLayout = ({
  openModalTable,
  tableTh,
  currentPack,
  isCasting,
  toggleIsCasting,
  toggleModalTable,
}: {
  openModalTable: boolean;
  toggleModalTable: () => void;
  isCasting: boolean;
  toggleIsCasting: () => void;
  tableTh: TableTh;
  currentPack: CurrentPackProps;
}) => {
  const getTargetElement = () => document.getElementById("pdf-content");
  const option = {
    page: {
      margin: 10,
      format: "letter",
      orientation: "landscape",
    },
    filename: `${currentPack?.attributes?.Nom}_trombi_${
      !isCasting ? "équipe_Production" : "équipe_Casting"
    }`,
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        mimeType: "image/jpeg",
        qualityRatio: 1,
        useCORS: false,
      },
    },
  };
  return (
    openModalTable && (
      <section className="fixed top-0 left-0 bg-white text-black w-full h-full overflow-x-scroll  p-9 z-50">
        <div className="   mb-2 sticky top-[-5%] left-0 bg-white w-full z-50 p-1 radius border">
          <div className="flex items-center w-full justify-center">
            <div className="flex gap-4 ml-auto">
              <DownloadButton
                generatePDF={generatePDF}
                getTargetElement={getTargetElement}
                options={option}
              />
              <ToggleSwitch
                isCasting={isCasting}
                toggleIsCasting={toggleIsCasting}
              />
            </div>
            <AiFillCloseCircle
              onClick={toggleModalTable}
              className="fill-black ml-auto w-6 h-6 cursor-pointer hover:fill-gray-500 transition-all ease-in"
            />
          </div>
        </div>
        <Table
          tableTh={tableTh}
          currentPack={currentPack}
          isCasting={isCasting}
        />
      </section>
    )
  );
};

export default TrombiLayout;

const ToggleSwitch = ({
  isCasting,
  toggleIsCasting,
}: {
  isCasting: boolean;
  toggleIsCasting: () => void;
}) => {
  return (
    <div className="flex items-center gap-1 grow">
      <input
        name="isCasting"
        type="checkbox"
        checked={isCasting}
        onChange={toggleIsCasting}
      />
      <label htmlFor="isCasting" className="text-black capitalize">
        {!isCasting ? "équipe Production" : "équipe Casting"}
      </label>
    </div>
  );
};
interface DownloadButtonProps {
  generatePDF: typeof generatePDF;
  getTargetElement: any;
  options: any;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  generatePDF,
  getTargetElement,
  options,
}) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    generatePDF(getTargetElement, options);
  };

  return (
    <button
      onClick={handleClick}
      className="block border border-black radius p-2"
    >
      Download
    </button>
  );
};
