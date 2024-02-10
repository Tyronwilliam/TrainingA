import { getCandidat } from "@/app/[lang]/choix/genre/[gender]/action";
import {
  filterParams,
  handleQuery,
  handleQueryTaille,
} from "@/app/[lang]/choix/genre/[gender]/function";
import { useEffect, useState } from "react";
import useCustomRouter from "../Basic/useCustomRouter";
interface PhysioState {
  Age: string[]; // Change 'any' to the actual type of your Age array elements
  Taille: string; // Change 'any' to the actual type of your Taille array elements
  Type: string[]; // Change 'any' to the actual type of your Type array elements
  Compétence: string[];
  Unique: boolean; // Change 'any' to the actual type of your Compétence array elements
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
    Unique: true,
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
  useEffect(() => {
    console.log(valuePhysio);
  }, [valuePhysio]);
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
      const updatedQueryString = newQueryString
        .toString()
        .replace(`${key}=${value}`, "");

      const linkHref = `${pathname}?${updatedQueryString}`;
      router.push(linkHref);
    } else {
      const linkHref = `${pathname}?${newQueryString}`;
      router.push(linkHref);
    }
    setValuePhysio((prevValue: PhysioState) => {
      //@ts-ignore
      const existingValues = prevValue[key] ;

      let updatedValues;

      if (typeof existingValues === "string") {
        updatedValues = value;
      } else if (typeof existingValues === "boolean") {
        updatedValues = !existingValues;
      } else if (Array.isArray(existingValues)) {
        if (existingValues.includes(value)) {
          updatedValues = [];
        } else {
          if (existingValues.length < 2) {
            updatedValues = [...existingValues, value];
          } else {
            updatedValues = [existingValues[0], value];
          }
        }
      } else {
        // handle other types if needed
        updatedValues = existingValues;
      }

      return {
        ...prevValue,
        [key]: updatedValues,
      };
    });

    // Parcourez les clés du nouvel objet et ajoutez les valeurs correspondantes aux tableaux

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
    router,
    pathname,
  };
};

export default useFilter;
