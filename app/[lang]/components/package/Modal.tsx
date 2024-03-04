import { AiFillCloseCircle } from "react-icons/ai";
import React, { ReactNode } from "react";
type Props = {
  open: boolean;
  children: ReactNode;
  toggle: () => void;
  classSection: string;
  classDialog: string;
  classIcone: string;
};
export default function Modal({
  open,
  children,
  toggle,
  classSection,
  classDialog,
  classIcone,
}: Props) {
  return (
    open && (
      <section className={classSection}>
        <dialog
          onClick={(e) => e.stopPropagation()}
          open={open}
          className={classDialog}
        >
          <AiFillCloseCircle onClick={toggle} className={classIcone} />
          {children}
        </dialog>
      </section>
    )
  );
}
