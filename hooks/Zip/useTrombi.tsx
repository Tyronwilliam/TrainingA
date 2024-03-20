import { useState } from "react";
interface Candidate {
  id: number;
  heure: string;
  role: string;
}

const useTrombi = () => {
  const [editedCandidates, setEditedCandidates] = useState<
    Record<number, Partial<Candidate>>
  >({});

  const handleTimeChange = (candidateId: number, newTime: string) => {
    setEditedCandidates((prev) => ({
      ...prev,
      [candidateId]: { ...prev[candidateId], heure: newTime },
    }));
  };

  const handleRoleChange = (candidateId: number, newRole: string) => {
    setEditedCandidates((prev) => ({
      ...prev,
      [candidateId]: { ...prev[candidateId], role: newRole },
    }));
  };

  const saveChanges = () => {
    console.log("Edited Candidates:", editedCandidates);
  };

  return {
    handleTimeChange,
    handleRoleChange,
    saveChanges,
    editedCandidates,
  };
};

export default useTrombi;
