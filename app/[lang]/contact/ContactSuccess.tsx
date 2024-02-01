import { Dictionary } from "@/types/dictionary";
import Link from "next/link";
import React from "react";

const ContactSuccess = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <div className="m-auto grow text-center w-full h-full border-2 border-red-300 flex flex-col justify-center items-center gap-4">
      <p>{dictionary?.contact?.formEvent}</p>
      <Link
        href={`/`}
        className="boutonSlideCommon shrink-0 text-lg max-w-[120px] w-full radius p-2.5 "
      >
        {dictionary?.cta?.accueil}
      </Link>
    </div>
  );
};

export default ContactSuccess;
