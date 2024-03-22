import { useEffect, useState } from "react";
interface Candidate {
  id: number;
  heure: string;
  role: string;
}

const useTrombi = (candidatArray: any) => {
  const [editedCandidates, setEditedCandidates] = useState(candidatArray);

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    candidateId: number
  ) => {
    e.preventDefault();
    const newTime = e.target.value;

    setEditedCandidates((prev: any) => {
      return prev.map((candidate: any) => {
        if (candidate.id === candidateId) {
          return {
            ...candidate,
            heure: newTime,
          };
        }
        return candidate;
      });
    });
  };
  const sortByHeure = (a: any, b: any) => {
    const heureA = a.heure;
    const heureB = b.heure;

    // Comparaison des heures (en supposant que les heures sont au format "HH:mm")
    return heureA?.localeCompare(heureB);
  };

  const sortCandidatesByTime = () => {
    const sortedCandidatesArray = [...editedCandidates].sort(sortByHeure);
    setEditedCandidates(sortedCandidatesArray);
  };

  const handleRoleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    candidateId: number
  ) => {
    e.preventDefault();
    const newRole = e.target.value;

    setEditedCandidates((prev: any) => {
      return prev.map((candidate: any) => {
        if (candidate.id === candidateId) {
          return {
            ...candidate,
            role: newRole,
          };
        }
        return candidate;
      });
    });
  };

  return {
    handleTimeChange,
    handleRoleChange,
    editedCandidates,
    sortCandidatesByTime,
  };
};

export default useTrombi;
