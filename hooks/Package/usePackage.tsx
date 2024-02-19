"use client";
import {
  associateCandidatsWithPackage,
  getPackagesById,
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
  const [allPack, setAllPack] = useState([]);
  const [candidatId, setCandidatId] = useState<number | null>(null);
  // @ts-ignore
  const userId = session?.user?.id; // @ts-ignore
  const jwt = session?.user?.jwt;

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
  const useAssociateCandidatsWithPackage = async (
    packageId: number,
    candidatId: number,
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
  const exposed = {
    fetchPackageById,
    allPack,
    candidatId,
    setCandidatId,
    useAssociateCandidatsWithPackage,
  };
  return (
    <PackageContext.Provider value={exposed}>
      {children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;
