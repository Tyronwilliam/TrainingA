import React from "react";
import useDownloader from "react-use-downloader";
import JSZip from "jszip";

const useZipDownload = () => {
  //   const fetchData = async (url: string) => {
  //     const response = await fetch(url);
  //     const data = await response.blob();
  //     return data;
  //   };

  //   const downloadFile = async (url: string, name: string, zip: any) => {
  //     const fileData = await fetchData(url);
  //     zip.file(name, fileData);
  //   };
  //   const downloadAllFiles = async (candidate: any) => {
  //     const zip = new JSZip();
  //     const candidatArray = Array.isArray(candidate) ? candidate : [candidate];
  //     // Download files for each person
  //     for (const candidat of candidatArray) {
  //       await downloadFile(
  //         candidat?.attributes?.Photo_de_presentation?.data?.attributes?.url,
  //         candidat?.attributes?.Photo_de_presentation?.data?.attributes?.name,
  //         zip
  //       );
  //       if (candidat?.attributes?.Portfolio?.Portfolio?.data?.length > 0) {
  //         for (const photo of candidat?.attributes?.Portfolio?.Portfolio?.data) {
  //           await downloadFile(
  //             photo?.attributes?.url,
  //             photo?.attributes?.name,
  //             zip
  //           );
  //         }
  //       }
  //       if (candidat?.attributes?.Bande_Demo?.data?.length > 0) {
  //         // Ajouter condition si vide ou non
  //         for (const video of candidat?.attributes?.Bande_Demo?.data) {
  //           await downloadFile(
  //             video?.attributes?.url,
  //             video?.attributes?.name,
  //             zip
  //           );
  //         }
  //       }
  //       // Check value when video presnetation is empty null or undefined
  //       if (candidat?.attributes?.Video_Presentation?.data) {
  //         await downloadFile(
  //           candidat?.attributes?.Video_Presentation?.data?.attributes?.url,
  //           candidat?.attributes?.Video_Presentation?.data?.attributes?.name,
  //           zip
  //         );
  //       }
  //     }

  //     const blob = await zip.generateAsync({ type: "blob" });

  //     // Create a temporary link element to trigger the download
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.download = `${candidate?.attributes?.Nom}-${candidate?.attributes?.Prenom}`;

  //     // Append the link to the document, trigger a click, and remove the link
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   };
  const fetchData = async (url: string) => {
    const response = await fetch(url);
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

  const downloadAllFiles = async (candidates: any) => {
    const globalZip = new JSZip()!;
    const candidatArray = Array.isArray(candidates) ? candidates : [candidates];

    for (const candidate of candidatArray) {
      const zip = new JSZip();
      const candidateFolderName: string = `${
        candidate?.attributes?.Nom || "NomInconnu"
      }-${candidate?.attributes?.Prenom || "PrenomInconnu"}`;

      await downloadFile(
        candidate?.attributes?.Photo_de_presentation?.data?.attributes?.url,
        candidate?.attributes?.Photo_de_presentation?.data?.attributes?.name,
        zip,
        "Photos"
      );

      if (candidate?.attributes?.Portfolio?.Portfolio?.data?.length > 0) {
        for (const photo of candidate?.attributes?.Portfolio?.Portfolio?.data) {
          await downloadFile(
            photo?.attributes?.url,
            photo?.attributes?.name,
            zip,
            "Portfolio"
          );
        }
      }

      if (candidate?.attributes?.Bande_Demo?.data?.length > 0) {
        for (const video of candidate?.attributes?.Bande_Demo?.data) {
          await downloadFile(
            video?.attributes?.url,
            video?.attributes?.name,
            zip,
            "Bande_Demo"
          );
        }
      }

      if (candidate?.attributes?.Video_Presentation?.data) {
        await downloadFile(
          candidate?.attributes?.Video_Presentation?.data?.attributes?.url,
          candidate?.attributes?.Video_Presentation?.data?.attributes?.name,
          zip,
          "Video_Presentation"
        );
      }

      const candidateZipBlob = await zip.generateAsync({ type: "blob" });

      if (globalZip && candidateFolderName) {
        //@ts-ignore
        globalZip
          .folder(candidateFolderName)
          .file(`${candidateFolderName}.zip`, candidateZipBlob);
      } else {
        // Handle the case where globalZip or candidateFolderName is null
        console.error("Error: globalZip or candidateFolderName is null.");
      }
    }

    const globalBlob = await globalZip.generateAsync({ type: "blob" });

    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(globalBlob);
    link.download = "all_candidates.zip";

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
