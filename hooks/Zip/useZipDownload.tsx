import React from "react";
import useDownloader from "react-use-downloader";
import JSZip from "jszip";

const useZipDownload = () => {
  const { percentage, download, cancel, error, isInProgress } = useDownloader({
    mode: "no-cors",
  });

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    return data;
  };

  const downloadFile = async (url: string, name: string, zip: any) => {
    const fileData = await fetchData(url);
    zip.file(name, fileData);
  };
  const downloadAllFiles = async (candidat: any) => {
    const zip = new JSZip();
    const candidatArray = Array.isArray(candidat) ? candidat : [candidat];

    // Download files for each person
    for (const candidat of candidatArray) {
      await downloadFile(
        candidat?.attributes?.Photo_de_presentation?.data?.attributes?.url,
        candidat?.attributes?.Photo_de_presentation?.data?.attributes?.name,
        zip
      );
      // Boucle pour chaque photo du candidat
      for (const photo of candidat.attributes?.Portfolio?.Portfolio?.data) {
        await downloadFile(
          photo?.attributes?.url,
          photo?.attributes?.name,
          zip
        );
      }
      if (candidat?.attributes?.Bande_Demo?.data > 0) {
        // Ajouter condition si vide ou non
        for (const video of candidat?.attributes?.Bande_Demo?.data) {
          await downloadFile(
            video?.attributes?.url,
            video?.attributes?.name,
            zip
          );
        }
      }
      // Check value when video presnetation is empty null or undefined
      await downloadFile(
        candidat?.attributes?.Video_Presentation?.data?.attributes?.url,
        candidat?.attributes?.Video_Presentation?.data?.attributes?.name,
        zip
      );
    }
    // Generate a zip file and trigger its download
    zip.generateAsync({ type: "blob" }).then((blob) => {
      download(
        URL.createObjectURL(blob),
        `${candidat?.attributes?.Nom}-${candidat?.attributes?.Prenom}`
      );
    });
  };

  return {
    downloadAllFiles,
    percentage,
    cancel,
    error,
    isInProgress,
  };
};

export default useZipDownload;
