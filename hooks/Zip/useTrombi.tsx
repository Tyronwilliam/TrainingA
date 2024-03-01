import React, { useState } from "react";
interface Candidate {
  id: number;
  heure: string;
  role: string;
}

interface YourComponentProps {
  currentPack?: Candidate[];
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
    // Implement the logic to save the edited candidates (editedCandidates) to your backend or state
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
