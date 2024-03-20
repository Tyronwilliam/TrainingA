"use client";
import {
  associateCandidatsWithPackage,
  createPackage,
  deleteCandidat,
  deletePackage,
  getPackagesById,
  updatePackageName,
} from "@/services/package/request";
import { PackSchema } from "@/types/package";
import { sendToast } from "@/utils/toast";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";
import useZipDownload from "../Zip/useZipDownload";
import { generateTextFromCandidats } from "@/app/[lang]/choix/genre/[gender]/functionPackage";

type GenericContextType = {
  [key: string]: any;
};

export const PackageContext = createContext<GenericContextType>({});
export const usePackage = () => useContext(PackageContext);
const PackageProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const { downloadAllFiles } = useZipDownload();

  // @ts-ignore
  const userId = session?.user?.id; // @ts-ignore
  const jwt = session?.user?.jwt;
  const [allPack, setAllPack] = useState([]);
  const [candidatId, setCandidatId] = useState<number | null>(null);
  const [packName, setPackName] = useState<string>("");
  const [openPackId, setOpenPackId] = useState<number | null>(null);
  const [currentTable, setCurrentTable] = useState<number | null>(null);
  const [currentPack, setCurrentPack] = useState<PackSchema[]>([]);
  const handleCurrentTable = (tableId: number) => {
    if (currentTable === tableId) {
      setCurrentTable(null);
    } else {
      setCurrentTable(tableId);
    }
  };

  const handleTogglePack = (packId: number) => {
    setOpenPackId(openPackId === packId ? null : packId);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setPackName(value);
  };

  const handleCopyUrlClipBoard = async (packId: number) => {
    const baseURL = `${process.env.NEXT_PUBLIC_FRONT_URL}/fr/package?`;
    const url = baseURL + "pack=" + packId;
    await navigator.clipboard
      .writeText(url)
      .then(() => {
        sendToast(false, "URL COPIED");
      })
      .catch((error) => {
        sendToast(true, "FAIL TO COPY URL");
      });
  };
  const handleCopyAllEmail = async (
    candidats: [candidats: { attributes: { Email: string } }]
  ) => {
    const allEmail = generateTextFromCandidats(candidats);
    await navigator.clipboard
      .writeText(allEmail)
      .then(() => {
        sendToast(false, "EMAILS COPIED");
      })
      .catch((error) => {
        sendToast(true, "FAIL TO COPY EMAILS");
      });
  };
  const fetchPackageById = async () => {
    try {
      const response = await getPackagesById(userId, jwt);
      if (response?.status === 200) {
        const packages = response?.data?.data;
        setAllPack(packages);
      } else {
        sendToast(true, response?.response?.data?.error?.message);
      }
    } catch (err) {
      sendToast(true, "An error occurred");
    }
  };
  const connectCandidatsAndPackage = async (
    packageId: number,
    candidatId: number
  ) => {
    const data = {
      candidats: [candidatId],
    };
    try {
      const response = await associateCandidatsWithPackage(
        packageId,
        data,
        jwt
      );
      if (response?.status === 200) {
        await fetchPackageById();
        sendToast(false, "Talent ajouté");
      } else {
        sendToast(true, response?.response?.data?.error?.message);
      }
    } catch (error: any) {
      console.error(
        "Une erreur s'est produite lors de la requête :",
        error.message
      );
    }
  };
  const useCreatePackage = async () => {
    const data = {
      Nom: packName,
      users_permissions_user: userId,
    };
    try {
      const response = await createPackage(data, jwt);
      if (response?.status === 200) {
        const id = await response?.data?.data?.id;
        if (candidatId !== null) {
          await connectCandidatsAndPackage(id, candidatId);
          await fetchPackageById();
          sendToast(false, "Package crée");
          setPackName("");
        }
      } else {
        sendToast(true, response?.response?.data?.error?.message);
      }
    } catch (error: any) {
      console.error(
        "Une erreur s'est produite lors de la requête :",
        error.message
      );
      sendToast(true, "An error occured");
    }
  };

  const editPackageName = async (packId: number) => {
    try {
      const response = await updatePackageName(packId, packName, jwt);

      if (response?.status === 200) {
        await fetchPackageById();
        sendToast(false, "Modification réussi");
        setPackName("");
      } else {
        sendToast(true, response?.response?.data?.error?.message);
      }
    } catch (error: any) {
      console.error(
        "Une erreur s'est produite lors de la requête :",
        error.message
      );
      sendToast(true, "An error occured");
    }
  };

  const trashPackage = async (packId: number) => {
    try {
      const response = await deletePackage(packId, jwt);
      if (response?.status === 200) {
        await fetchPackageById();
        sendToast(false, "Successful delete");
      } else {
        sendToast(true, response?.response?.data?.error?.message);
      }
    } catch (error: any) {
      console.error(
        "Une erreur s'est produite lors de la requête :",
        error.message
      );
      sendToast(true, "An error occured");
    }
  };
  const detachCandidat = async (id: number, candidatId: number) => {
    const data = {
      candidats: [candidatId],
    };
    try {
      const response = await deleteCandidat(id, data, jwt);
      if (response?.status === 200) {
        await fetchPackageById();
        sendToast(false, "Talent deleted");
      } else {
        sendToast(true, response?.response?.data?.error?.message);
      }
    } catch (error: any) {
      console.error(
        "Une erreur s'est produite lors de la requête :",
        error.message
      );
      sendToast(true, "An error occured");
    }
  };
  const exposed = {
    fetchPackageById,
    allPack,
    candidatId,
    setCandidatId,
    connectCandidatsAndPackage,
    handleInputChange,
    useCreatePackage,
    packName,
    setPackName,
    editPackageName,
    openPackId,
    setOpenPackId,
    handleTogglePack,
    currentTable,
    setCurrentTable,
    handleCurrentTable,
    handleCopyUrlClipBoard,
    trashPackage,
    detachCandidat,
    currentPack,
    setCurrentPack,
    downloadAllFiles,
    handleCopyAllEmail,
  };
  return (
    <PackageContext.Provider value={exposed}>
      {children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;
