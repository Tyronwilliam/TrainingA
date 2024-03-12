import JSZip from "jszip";

const useZipDownload = () => {
  const fetchData = async (url: string) => {
    const response = await fetch(url, { mode: "no-cors" });
    const data = await response.blob();
    return data;
  };

  const downloadFile = async (
    url: string,
    name: string,
    zip: any,
    folder: string
  ) => {
    const fileData = await fetchData(url);
    zip.folder(folder).file(name, fileData);
  };

  const downloadAllFiles = async (candidates: any, packName: string | null) => {
    const globalZip = new JSZip();
    const candidatArray = Array.isArray(candidates) ? candidates : [candidates];
    const nameZip = packName !== null ? packName : "Talents";

    for (const candidate of candidatArray) {
      const candidateFolderName: string = `${
        candidate?.attributes?.Nom || "NomInconnu"
      }-${candidate?.attributes?.Prenom || "PrenomInconnu"}`;

      const candidateFolder = globalZip.folder(candidateFolderName);

      const photosFolder = candidateFolder!.folder("Photos");
      const videosFolder = candidateFolder!.folder("Videos");

      await downloadFile(
        candidate?.attributes?.Photo_de_presentation?.data?.attributes?.url,
        candidate?.attributes?.Photo_de_presentation?.data?.attributes?.name,
        photosFolder,
        ""
      );

      if (candidate?.attributes?.Portfolio?.Portfolio?.data?.length > 0) {
        for (const photo of candidate?.attributes?.Portfolio?.Portfolio?.data) {
          await downloadFile(
            photo?.attributes?.url,
            photo?.attributes?.name,
            photosFolder,
            ""
          );
        }
      }

      if (candidate?.attributes?.Bande_Demo?.data?.length > 0) {
        for (const video of candidate?.attributes?.Bande_Demo?.data) {
          await downloadFile(
            video?.attributes?.url,
            video?.attributes?.name,
            videosFolder,
            ""
          );
        }
      }

      if (candidate?.attributes?.Video_Presentation?.data) {
        await downloadFile(
          candidate?.attributes?.Video_Presentation?.data?.attributes?.url,
          candidate?.attributes?.Video_Presentation?.data?.attributes?.name,
          videosFolder,
          ""
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
