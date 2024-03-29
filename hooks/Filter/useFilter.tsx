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
  const [searchPrenom, setSearchPrenom] = useState("");
  const [showResetButton, setShowResetButton] = useState(false);
  const [valuePhysio, setValuePhysio] = useState<PhysioState>({
    Age: [],
    Taille: "",
    Type: [],
    Compétence: [],
    Unique: false,
    Prenom: "",
  });
  const compétence = searchParams.get("Compétence");
  const age = searchParams.get("Age");
  const taille = searchParams.get("Taille");
  const type = searchParams.get("Type");
  const uniqueParams = searchParams.get("Unique");
  const role = searchParams.get("Role");
  const prenom = searchParams.get("Prenom");
  const queryParams = {
    Compétence: compétence,
    Age: age,
    Taille: taille,
    Type: type,
    Unique: uniqueParams,
    Prenom: prenom,
  };
  const paramsFiltered = filterParams(queryParams);
  const queryToString = new URLSearchParams(paramsFiltered).toString();
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
      prenom: prenom !== null ? prenom : undefined,
    });
    handleRole(role);
    const isPrenom = prenom === null ? false : true;
    setShowResetButton(isPrenom);
  }, [role, compétence, age, taille, type, uniqueParams, prenom]);

  useEffect(() => {
    const newObject = {
      Age: age ? age.split(",") : [],
      Taille: taille || "",
      Type: type ? type.split(",") : [],
      Compétence: compétence ? compétence.split(",") : [],
      Unique: uniqueParams !== null && JSON.parse(uniqueParams),
      Prenom: prenom || "",
    };
    setValuePhysio(newObject);
  }, []);
  ////////////////////
  const handleSubmitSearch = async (e: any, prenom: string) => {
    e.preventDefault();
    await handlePhysioQuery(prenom.trim(), "Prenom");
    setSearchPrenom("");
  };
  //////////////////////
  const handleResetSearch = () => {
    const { Prenom, ...queryParamsCopy } = queryParams;
    const queryToString = new URLSearchParams(
      filterParams(queryParamsCopy)
    ).toString();
    const link = `${pathname}?${queryToString}`;
    return router.push(link);
  };

  ////////////////////
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchPrenom(newValue);
  };
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

  const handlePhysioQuery = async (value: string | boolean, key: string) => {
    const queryInUrl = new URLSearchParams(queryToString);
    const queryValue = queryInUrl.get(key as string);
    const queryValueToArray = queryValue ? queryValue.split(",") : [];

    let newQueryInUrl: any;

    if (key === "Taille" || (key === "Prenom" && value !== "")) {
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
    prenom: prenom,
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
      prenom: prenom,
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
          prenom: prenom !== null ? prenom : undefined,
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
          prenom: prenom !== null ? prenom : undefined,
        });
        break;
      case "Accepte_Figuration":
        router.push(
          `${pathname}?Role=Accepte_Figuration${
            queryToString ? `&${queryToString}` : ""
          }`
        );
        await fetchData({
          gender: gender,
          role: "Accepte_Figuration",
          properStart: 0,
          competence: compétence !== null ? compétence : undefined,
          age: age !== null ? age : undefined,
          taille: taille !== null ? taille : undefined,
          type: type !== null ? type : undefined,
          unique: uniqueParams !== null ? uniqueParams : undefined,
          prenom: prenom !== null ? prenom : undefined,
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
          prenom: prenom !== null ? prenom : undefined,
        });
        break;

      default:
        break;
    }
  };

  const loadMoreUsers = async () => {
    const properStart = candidat?.length;
    const startParams = meta >= candidat.length ? candidat.length : 0;
    if (role || compétence || age || taille || type || uniqueParams || prenom) {
      const response = await getCandidat({
        gender: gender,
        properStart: startParams,
        competence: compétence !== null ? compétence : undefined,
        age: age !== null ? age : undefined,
        taille: taille !== null ? taille : undefined,
        type: type !== null ? type : undefined,
        unique: uniqueParams !== null ? uniqueParams : undefined,
        prenom: prenom !== null ? prenom : undefined,
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
        prenom: prenom !== null ? prenom : undefined,
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
    handleSearchInputChange,
    handleSubmitSearch,
    searchPrenom,
    showResetButton,
    handleResetSearch,
  };
};

export default useFilter;
