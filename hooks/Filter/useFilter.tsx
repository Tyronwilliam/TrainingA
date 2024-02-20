import {
  getCandidat,
  getCandidatParams,
} from "@/app/[lang]/choix/genre/[gender]/action";
import {
  filterParams,
  handleQuery,
  handleQueryTaille,
} from "@/app/[lang]/choix/genre/[gender]/function";
import { useEffect, useState } from "react";
import useCustomRouter from "../Basic/useCustomRouter";
import { PhysioState } from "@/app/[lang]/choix/genre/[gender]/type";
export type Gender = "Men" | "Women" | "Kids";

const useFilter = (talents: any, metaInitial: any, gender: Gender) => {
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
    fetchData({
      gender: gender,
      properStart: 0,
      role: role !== null ? role : undefined,
      competence: compétence !== null ? compétence : undefined,
      age: age !== null ? age : undefined,
      taille: taille !== null ? taille : undefined,
      type: type !== null ? type : undefined,
      unique: uniqueParams !== null ? uniqueParams : undefined,
    });

    handleRole(role);
  }, [role, compétence, age, taille, type, uniqueParams]);

  useEffect(() => {
    const newObject = {
      Age: age ? age.split(",") : [],
      Taille: taille || "",
      Type: type ? type.split(",") : [],
      Compétence: compétence ? compétence.split(",") : [],
      Unique: uniqueParams !== null && JSON.parse(uniqueParams),
    };
    setValuePhysio(newObject);
  }, []);
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
  const handlePhysioQuery = async (value: string | boolean, key: string) => {
    const queryInUrl = new URLSearchParams(queryToString);
    const queryValue = queryInUrl.get(key as string);
    const queryValueToArray = queryValue ? queryValue.split(",") : [];

    let newQueryInUrl: any;

    if (key === "Taille") {
      newQueryInUrl = handleQueryTaille(
        queryValueToArray,
        value,
        key,
        queryInUrl
      );
    } else {
      newQueryInUrl = handleQuery(queryValueToArray, value, key, queryInUrl);
    }
    const newQueryString = newQueryInUrl.toString();
    let link;
    if (
      Array.isArray(valuePhysio[currentList]) &&
      //@ts-ignore
      valuePhysio[currentList]?.includes(value) &&
      value
    ) {
      const updatedQueryString = newQueryString
        .toString()
        .replace(`${key}=${value}`, "");

      link = `${pathname}?${updatedQueryString}`;
    } else {
      link = `${pathname}?${newQueryString}`;
    }
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

      return { ...prevValue, [key]: updatedValues } as PhysioState;
    });
  };

  const fetchData = async ({
    role,
    competence: compétence,
    age,
    taille,
    type,
    unique: uniqueParams,
  }: getCandidatParams) => {
    const queryParams = {
      gender: gender,
      properStart: 0,
      role,
      competence: compétence,
      age,
      taille,
      type,
      unique: uniqueParams,
    };
    ("use server");
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
        await fetchData({
          role: "Acteur",
          properStart: 0,
          gender: gender,
          competence: compétence !== null ? compétence : undefined,
          age: age !== null ? age : undefined,
          taille: taille !== null ? taille : undefined,
          type: type !== null ? type : undefined,
          unique: uniqueParams !== null ? uniqueParams : undefined,
        });
        break;
      case "Modele":
        router.push(
          `${pathname}?Role=Modele${queryToString ? `&${queryToString}` : ""}`
        );
        await fetchData({
          role: "Modele",
          properStart: 0,
          gender: gender,
          competence: compétence !== null ? compétence : undefined,
          age: age !== null ? age : undefined,
          taille: taille !== null ? taille : undefined,
          type: type !== null ? type : undefined,
          unique: uniqueParams !== null ? uniqueParams : undefined,
        });
        break;
      case "Figurant":
        router.push(
          `${pathname}?Role=Figurant${queryToString ? `&${queryToString}` : ""}`
        );
        await fetchData({
          gender: gender,
          role: "Figurant",
          properStart: 0,
          competence: compétence !== null ? compétence : undefined,
          age: age !== null ? age : undefined,
          taille: taille !== null ? taille : undefined,
          type: type !== null ? type : undefined,
          unique: uniqueParams !== null ? uniqueParams : undefined,
        });
        break;
      case "Tous":
        router.push(`${pathname}`);
        await fetchData({
          gender: gender,
          properStart: 0,
          competence: compétence !== null ? compétence : undefined,
          age: age !== null ? age : undefined,
          taille: taille !== null ? taille : undefined,
          type: type !== null ? type : undefined,
          unique: uniqueParams !== null ? uniqueParams : undefined,
        });
        break;
      default:
        break;
    }
  };

  const loadMoreUsers = async () => {
    const properStart = candidat?.length;
    const startParams = meta >= candidat.length ? candidat.length : 0;
    if (role || compétence || age || taille || type || uniqueParams) {
      const response = await getCandidat({
        gender: gender,
        properStart: startParams,
        competence: compétence !== null ? compétence : undefined,
        age: age !== null ? age : undefined,
        taille: taille !== null ? taille : undefined,
        type: type !== null ? type : undefined,
        unique: uniqueParams !== null ? uniqueParams : undefined,
      });
      const data = response?.data;
      const metaRes = response?.meta?.pagination?.total;
      setMeta(metaRes);
      setCandidat((prev: []) => [...prev, ...data]);
    } else {
      const response = await getCandidat({
        gender: gender,
        properStart,
        competence: compétence !== null ? compétence : undefined,
        age: age !== null ? age : undefined,
        taille: taille !== null ? taille : undefined,
        type: type !== null ? type : undefined,
        unique: uniqueParams !== null ? uniqueParams : undefined,
      });
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
