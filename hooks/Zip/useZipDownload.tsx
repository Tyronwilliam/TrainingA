import { capitalizeFirstLetter } from "@/app/[lang]/choix/genre/[gender]/function";
import JSZip from "jszip";

const useZipDownload = () => {
  const downloadFile = async (
    url: string,
    name: string,
    folder: any, // Remove 'zip' and 'folder' parameters since 'folder' contains the destination folder for the file
    fileType: string
  ) => {
    try {
      const response = await fetch(`/api/fetchBlob?image=${url}?name=${name}`, {
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
          "Content-Type": fileType,
        },
      });
      if (!response.ok) {
        throw new Error("Fail");
      }
      const blob = await response.blob();
      // Append the blob to the specified folder
      folder.file(name, blob);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const downloadAllFiles = async (candidates: any, packName: string | null) => {
    const globalZip = new JSZip();
    const candidatArray = Array.isArray(candidates) ? candidates : [candidates];
    const nameZip = packName !== null ? packName : "Talents";

    for (const candidate of candidatArray) {
      const letterLastName = capitalizeFirstLetter(candidate?.attributes?.Nom);

      const candidateFolderName: string = `${letterLastName || "NomInconnu"}-${
        candidate?.attributes?.Prenom || "PrenomInconnu"
      }`;

      const candidateFolder = await globalZip.folder(candidateFolderName);

      const photosFolder = candidateFolder?.folder("Photos");
      console.log(
        candidate?.attributes?.Photo_de_presentation?.data?.attributes
      );
      await downloadFile(
        candidate?.attributes?.Photo_de_presentation?.data?.attributes?.url,
        candidate?.attributes?.Photo_de_presentation?.data?.attributes?.name,
        photosFolder,
        candidate?.attributes?.Photo_de_presentation?.data?.attributes?.mime
      );

      if (candidate?.attributes?.Portfolio?.Portfolio?.data?.length > 0) {
        for (const photo of candidate?.attributes?.Portfolio?.Portfolio?.data) {
          await downloadFile(
            photo?.attributes?.url,
            photo?.attributes?.name,
            photosFolder,
            photo?.attributes?.mime
          );
        }
      }
      const videosFolder = candidateFolder?.folder("Videos");

      if (candidate?.attributes?.Bande_Demo?.data?.length > 0) {
        for (const video of candidate?.attributes?.Bande_Demo?.data) {
          await downloadFile(
            video?.attributes?.url,
            video?.attributes?.name,
            videosFolder,
            video?.attributes?.mime
          );
        }
      }

      if (candidate?.attributes?.Video_Presentation?.data) {
        await downloadFile(
          candidate?.attributes?.Video_Presentation?.data?.attributes?.url,
          candidate?.attributes?.Video_Presentation?.data?.attributes?.name,
          videosFolder,
          candidate?.attributes?.Video_Presentation?.data?.attributes?.mime
        );
      }
    }
    const globalBlob = await globalZip.generateAsync({ type: "blob" });

    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(globalBlob);
    link.download = `${nameZip}.zip`;

    // Append the link to the document, trigger a click, and remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    downloadAllFiles,
  };
};

export default useZipDownload;
