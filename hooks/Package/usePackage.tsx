"use client";
import { getPackagesById } from "@/services/package/request";
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
  const exposed = {
    fetchPackageById,
    allPack,
  };
  return (
    <PackageContext.Provider value={exposed}>
      {children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;
