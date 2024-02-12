import { getCandidat } from "@/app/[lang]/choix/genre/[gender]/action";
import {
  createNewUrl,
  filterParams,
  handleQuery,
  handleQueryTaille,
} from "@/app/[lang]/choix/genre/[gender]/function";
import { useEffect, useState } from "react";
import useCustomRouter from "../Basic/useCustomRouter";
export interface PhysioState {
  Age: string[]; // Change 'any' to the actual type of your Age array elements
  Taille: string; // Change 'any' to the actual type of your Taille array elements
  Type: string[]; // Change 'any' to the actual type of your Type array elements
  Compétence: string[];
  Unique: boolean; // Change 'any' to the actual type of your Compétence array elements
  [key: string]: string[] | string | boolean;
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
    Taille: "",
    Type: [],
    Compétence: [],
    Unique: false,
  });
  // const compétence = searchParams.get("Compétence");
  // const age = searchParams.get("Age");
  // const taille = searchParams.get("Taille");
  // const type = searchParams.get("Type");
  // const uniqueParams = searchParams.get("Unique");
  const role = searchParams.get("Role");
  const compétence = searchParams.getAll("Compétence");
  const age = searchParams.getAll("Age");
  const taille = searchParams.get("Taille") || ""; // Utiliser une chaîne vide si la valeur est null
  const type = searchParams.getAll("Type");
  const uniqueParams = searchParams.get("Unique");
  const queryParams = {
    Compétence: compétence,
    Age: age,
    Taille: taille,
    Type: type,
    Unique: uniqueParams,
  };
  useEffect(() => {
    // Mise à jour de la state locale

    handleRole(role);
  }, [compétence, age, taille, type, uniqueParams, role]);
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
  //@ts-ignore
  const paramsFiltered = filterParams(queryParams);
  const queryToString = new URLSearchParams(paramsFiltered).toString();
  //
  console.log(valuePhysio);
  const handlePhysioQuery = async (value: string | boolean, key: string) => {
    const queryInUrl = new URLSearchParams(queryToString);
    const queryValue = queryInUrl.get(key as string);
    const queryValueToArray = queryValue ? queryValue.split(",") : [];

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
    // let link: string;
    // if (
    //   Array.isArray(valuePhysio[currentList]) &&
    //   //@ts-ignore
    //   valuePhysio[currentList]?.includes(value)
    // ) {
    //   const updatedQueryString = newQueryString
    //     .toString()
    //     .replace(`${key}=${value}`, "");

    //   link = `${pathname}?${updatedQueryString}`;
    // } else {
    //   link = `${pathname}?${newQueryString}`;
    // }
    let link = `${pathname}?${
      Array.isArray(valuePhysio[currentList]) &&
      //@ts-ignore
      valuePhysio[currentList]?.includes(value)
        ? newQueryString.replace(`${key}=${value}`, "")
        : newQueryString
    }`;
    router.push(link);
    setValuePhysio((prevValue: PhysioState) => {
      const existingValues = prevValue[key];
      let updatedValues:
        | string
        | boolean
        | string[]
        | (string | boolean)[]
        | { [key: string]: any };

      if (typeof existingValues === "string") {
        updatedValues = value === existingValues ? "" : value;
      } else if (typeof existingValues === "boolean") {
        updatedValues = !existingValues;
      } else if (Array.isArray(existingValues)) {
        updatedValues = existingValues.includes(value as string)
          ? []
          : existingValues.length < 2
          ? [...existingValues, value]
          : [existingValues[0], value];
      } else {
        updatedValues = existingValues;
      }

      console.log(key, updatedValues, "FROM FUNCTION CHECK");

      return { ...prevValue, [key]: updatedValues } as PhysioState;
    });

    //@ts-ignore
    // setValuePhysio((prevValue: PhysioState) => {
    //   const existingValues = prevValue[key];
    //   let updatedValues;
    //   if (typeof existingValues === "string") {
    //     if (value === existingValues) {
    //       updatedValues = "";
    //     } else {
    //       updatedValues = value;
    //     }
    //   } else if (typeof existingValues === "boolean") {
    //     // handle other types if needed
    //     updatedValues = existingValues ? false : true;
    //   } else if (Array.isArray(existingValues)) {
    //     if (existingValues.includes(value as string)) {
    //       updatedValues = [];
    //     } else {
    //       if (existingValues.length < 2) {
    //         updatedValues = [...existingValues, value];
    //       } else {
    //         updatedValues = [existingValues[0], value];
    //       }
    //     }
    //   } else {
    //     updatedValues = existingValues;
    //   }
    //   console.log(key, updatedValues, "FROM FUNCTION CHECK");

    //   return {
    //     ...prevValue,
    //     [key]: updatedValues,
    //   };
    // });
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
    router,
    pathname,
    valuePhysio,
  };
};

export default useFilter;
