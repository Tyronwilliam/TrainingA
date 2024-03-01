import React from "react";
import { FaChevronUp } from "react-icons/fa";

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <button
      className="rounded-full fixed bottom-5 right-5 z-40 border-[1px] border-white bg-black p-2 group"
      onClick={scrollToTop}
    >
      <FaChevronUp className="w-4 h-4 fill-white group-hover:opacity-50" />
    </button>
  );
};

export default BackToTop;
