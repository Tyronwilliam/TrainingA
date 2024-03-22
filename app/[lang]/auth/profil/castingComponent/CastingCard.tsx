import React from "react";
import Buttons from "./Buttons";
import { CastingInfos } from "../type";

interface CastingCardProps {
  lieu: string;
  formattedDate: string;
  alreadyDisponible: boolean;
  alreadyIndisponible: boolean;
  castingId: number;
  candidatId: number;
  dateString: string;
  Informations: CastingInfos[];
  infosId: number;
  connectCandidat: (
    castingId: number,
    candidatId: number,
    dateString: string,
    Informations: CastingInfos[],
    infosId: number
  ) => void;
  dissociateCandidat: (
    castingId: number,
    candidatId: number,
    dateString: string,
    Informations: CastingInfos[],
    infosId: number
  ) => void;
  disponibleText: string;
  indisponibleText: string;
}

const CastingCard: React.FC<CastingCardProps> = ({
  lieu,
  formattedDate,
  alreadyDisponible,
  alreadyIndisponible,
  connectCandidat,
  dissociateCandidat,
  disponibleText,
  indisponibleText,
  castingId,
  candidatId,
  dateString,
  Informations,
  infosId,
}) => {
  return (
    <React.Fragment>
      <div className="flex gap-2 items-center">
        <span className="italic text-sm opacity-55">{lieu}</span>
        <span className="italic text-sm opacity-55">-</span>
        <span className="italic text-sm opacity-55">{formattedDate}</span>
      </div>
      <div className="w-full flex flex-wrap gap-2 justify-center">
        <Buttons
          disabled={alreadyDisponible}
          onClick={() => {
            connectCandidat(
              castingId,
              candidatId,
              dateString,
              Informations,
              infosId
            );
          }}
          text={disponibleText}
        />
        <Buttons
          disabled={alreadyIndisponible}
          onClick={() => {
            dissociateCandidat(
              castingId,
              candidatId,
              dateString,
              Informations,
              infosId
            );
          }}
          text={indisponibleText}
        />
      </div>
    </React.Fragment>
  );
};

export default CastingCard;
