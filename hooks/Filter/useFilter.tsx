import React, { useEffect, useState } from "react";
import useCustomRouter from "../Basic/useCustomRouter";
import {
  filterParams,
  handleQuery,
  handleQueryTaille,
} from "@/app/[lang]/choix/genre/[gender]/function";
import { getCandidat } from "@/app/[lang]/choix/genre/[gender]/action";
interface PhysioState {
  Age: string[]; // Change 'any' to the actual type of your Age array elements
  Taille: string[]; // Change 'any' to the actual type of your Taille array elements
  Type: string[]; // Change 'any' to the actual type of your Type array elements
  Compétence: string[]; // Change 'any' to the actual type of your Compétence array elements
}
const useFilter = (talents: any, metaInitial: any) => {
  const { router, pathname, searchParams } = useCustomRouter();

  const [candidat, setCandidat] = useState(talents);
  const [currentRole, setCurrentRole] = useState<string>("Tous");
  const [currentPhysio, setCurrentPhysio] = useState<string[]>([]);
  const [currentList, setCurrentList] = useState("");
  const [meta, setMeta] = useState(metaInitial);
  const [valuePhysio, setValuePhysio] = useState<PhysioState>({
    Age: [],
    Taille: [],
    Type: [],
    Compétence: [],
  });
  const compétence = searchParams.get("Compétence");
  const age = searchParams.get("Age");
  const taille = searchParams.get("Taille");
  const type = searchParams.get("Type");
  const uniqueParams = searchParams.get("Unique");
  const role = searchParams.get("Role");

  const queryParams = {
    Compétence: compétence,
    Age: age,
    Taille: taille,
    Type: type,
    Unique: uniqueParams,
  };
  useEffect(() => {
    handleRole(role);
  }, [role]);

  ////////////////////
  const handleRole = (role: string | null) => {
    if (role === null) {
      setCurrentRole("Tous");
    } else {
      setCurrentRole(role);
    }
  };
  //////////////////////
  const handleCurrentList = (arg: string) => {
    if (currentList === arg) {
      setCurrentList("");
    } else {
      setCurrentList(arg);
    }
  };
  //////////////////////
  const paramsFiltered = filterParams(queryParams);
  const queryToString = new URLSearchParams(paramsFiltered).toString();
  //
  const handlePhysioQuery = (value: string | boolean, key: string) => {
    console.log(value, "++++++", key, "+++++++++++", key);
    //@ts-ignore
    console.log(valuePhysio[currentList]);
    const queryInUrl = new URLSearchParams(queryToString);
    const queryValue = queryInUrl.get(key);
    //@ts-ignore
    const queryValueToArray = queryValue ? queryValue.split(",") : [];
    console.log(value, "ALORQ ALORS");

    //COndition quand c'est number et quand c'est taille ou non
    // Convertit les paramètres en chaîne de requête
    let newQueryInUrl: any;

    if (key === "Taille") {
      newQueryInUrl = handleQueryTaille(
        queryValueToArray,
        value as string,
        key,
        queryInUrl
      );
    } else {
      newQueryInUrl = handleQuery(
        queryValueToArray,
        value as string,
        key,
        queryInUrl
      );
    }
    const newQueryString = newQueryInUrl.toString();
    if (
      //@ts-ignore
      Array.isArray(valuePhysio[currentList]) &&
      //@ts-ignore
      valuePhysio[currentList]?.includes(value)
    ) {
      // Vérifie si la valeur est déjà présente dans subSelected
      //@ts-ignore
      //  Construit le lienHref sans l'item dans l'URL

      const updatedQueryString = newQueryString
        .toString()
        .replace(`${key}=${value}`, "");

      const linkHref = `${pathname}?${updatedQueryString}`;
      router.push(linkHref);
    } else {
      const linkHref = `${pathname}?${newQueryString}`;
      router.push(linkHref);
    }
    ////////////////
    // const isSelected = currentPhysio.includes(arg);
    // if (isSelected) {
    //   const newArray = currentPhysio.filter(
    //     (selectedItem) => selectedItem !== arg
    //   );
    //   setCurrentPhysio(newArray);
    // } else {
    //   if (currentPhysio.length < 2) {
    //     const newArray = [...currentPhysio, arg];
    //     setCurrentPhysio(newArray);
    //   }
    // }
  };

  const fetchData = async (role: string | undefined = undefined) => {
    const queryParams = role
      ? { gender: "Men", properStart: 0, role }
      : { gender: "Men", properStart: 0 };

    const response = await getCandidat(queryParams);
    const data = response?.data;
    const metaRes = response?.meta?.pagination?.total;

    setMeta(metaRes);
    setCandidat(data);
  };

  const handleFilter = async (value: string) => {
    switch (value) {
      case "Acteur":
        router.push(
          `${pathname}?Role=Acteur${queryToString ? `&${queryToString}` : ""}`
        );
        await fetchData("Acteur");
        break;
      case "Modele":
        router.push(
          `${pathname}?Role=Modele${queryToString ? `&${queryToString}` : ""}`
        );
        await fetchData("Modele");
        break;
      case "Figurant":
        router.push(
          `${pathname}?Role=Figurant${queryToString ? `&${queryToString}` : ""}`
        );
        await fetchData("Figurant");
        break;
      case "Tous":
        router.push(`${pathname}`);
        await fetchData();
        break;
      default:
        break;
    }
  };

  const loadMoreUsers = async () => {
    const properStart = candidat?.length;
    const startParams = meta >= candidat.length ? candidat.length : 0;
    if (role !== null) {
      const response = await getCandidat({
        gender: "Men",
        properStart: startParams,
        role: role,
      });
      console.log("LOADUSERS", talents);

      const data = response?.data;
      const metaRes = response?.meta?.pagination?.total;
      setMeta(metaRes);
      setCandidat((prev: []) => [...prev, ...data]);
    } else {
      const response = await getCandidat({ gender: "Men", properStart });
      const data = response?.data;
      const metaRes = response?.meta?.pagination?.total;
      setMeta(metaRes);
      setCandidat((prev: []) => [...prev, ...data]);
    }
  };

  return {
    loadMoreUsers,
    handleFilter,
    handlePhysioQuery,
    handleCurrentList,
    handleRole,
    meta,
    setMeta,
    currentList,
    setCurrentList,
    currentPhysio,
    setCurrentPhysio,
    currentRole,
    setCurrentRole,
    candidat,
    setCandidat,
  };
};

export default useFilter;
