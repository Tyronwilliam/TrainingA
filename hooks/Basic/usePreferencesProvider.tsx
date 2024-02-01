"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type PreferencesContextType = {
  isMute: boolean;
  setIsMute: React.Dispatch<React.SetStateAction<boolean>>;
  split: boolean;
  setSplit: React.Dispatch<React.SetStateAction<boolean>>;
  handleSplit: () => void;
};
export const PreferencesContext = createContext<PreferencesContextType>({
  isMute: false,
  setIsMute: () => {},
  split: false,
  setSplit: () => {},
  handleSplit: () => {},
});

export const usePreferences = () => useContext(PreferencesContext);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [isMute, setIsMute] = useState(true);
  const [split, setSplit] = useState(false);

  const handleSplit = () => {
    setSplit(true);
    setIsMute(false);
    sessionStorage.setItem("firstload", "done");
  };

  const toggleMute = () => {
    const storageMute = sessionStorage.getItem("audio");
    if (storageMute === "true") {
      setIsMute(true);
    } else {
      setIsMute(false);
    }
  };

  useEffect(() => {
    toggleMute();
    const hasPremierChargement = sessionStorage.getItem("firstload");
    if (hasPremierChargement !== null) {
      setSplit(true);
    } else {
      setIsMute(true);
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("firstload");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        sessionStorage.removeItem("firstload");
      });
    };
  }, []);

  const exposed = {
    isMute,
    setIsMute,
    split,
    setSplit,
    handleSplit,
  };
  return (
    <PreferencesContext.Provider value={exposed}>
      {children}
    </PreferencesContext.Provider>
  );
};
