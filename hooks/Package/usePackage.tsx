"use client";
import { generateUrlFromCandidats } from "@/app/[lang]/choix/genre/[gender]/functionPackage";
import {
  associateCandidatsWithPackage,
  createPackage,
  deletePackage,
  getPackagesById,
  updatePackageName,
} from "@/services/package/request";
import { sendToast } from "@/utils/toast";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";

type GenericContextType = {
  [key: string]: any;
};

export const PackageContext = createContext<GenericContextType>({});
export const usePackage = () => useContext(PackageContext);
const PackageProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user?.id; // @ts-ignore
  const jwt = session?.user?.jwt;
  const [allPack, setAllPack] = useState([]);
  const [candidatId, setCandidatId] = useState<number | null>(null);
  const [packName, setPackName] = useState<string>("");
  const [openPackId, setOpenPackId] = useState<number | null>(null);
  const [currentTable, setCurrentTable] = useState<number | null>(null);

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

  const handleCopyUrlClipBoard = async (
    candidats: [candidats: { id: number }],
    packName: string
  ) => {
    const url = generateUrlFromCandidats(candidats, packName);
    await navigator.clipboard
      .writeText(url)
      .then(() => {
        sendToast(false, "URL COPIED");
      })
      .catch((error) => {
        sendToast(true, "FAIL TO COPY URL");
      });
  };
  const fetchPackageById = async () => {
    try {
      const response = await getPackagesById(userId, jwt);
      if (response?.status === 200) {
        const packages = response?.data?.data;
        setAllPack(packages);
      } else {
        console.log(response);
        sendToast(true, response?.response?.data?.error?.message);
      }
    } catch (err) {
      sendToast(true, "An error occurred");
    }
  };
  const useAssociateCandidatsWithPackage = async (
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
          await useAssociateCandidatsWithPackage(id, candidatId);
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

  const useUpdatePackageName = async (packId: number) => {
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

  const useDeletePackage = async (packId: number) => {
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
    }
  };
  const exposed = {
    fetchPackageById,
    allPack,
    candidatId,
    setCandidatId,
    useAssociateCandidatsWithPackage,
    handleInputChange,
    useCreatePackage,
    packName,
    setPackName,
    useUpdatePackageName,
    openPackId,
    setOpenPackId,
    handleTogglePack,
    currentTable,
    setCurrentTable,
    handleCurrentTable,
    handleCopyUrlClipBoard,
    useDeletePackage,
  };
  return (
    <PackageContext.Provider value={exposed}>
      {children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;
