import { Dictionary } from "@/types/dictionary";
import { AiOutlineClose } from "react-icons/ai";
import { CiMenuBurger } from "react-icons/ci";

type EnteteProps = {
  toggle: () => void;
  open: boolean;
  dictionary: Dictionary;
};
const Entete = ({ dictionary, open, toggle }: EnteteProps) => {
  return (
    <div className="flex items-center w-full h-full justify-center md:hidden ">
      <div onClick={toggle} className="w-6 h-6 cursor-pointer">
        {open ? (
          <AiOutlineClose className="w-full h-full" />
        ) : (
          <CiMenuBurger className="w-full h-full" />
        )}
      </div>
      <h1 className="inline-block w-fit mx-auto text-2xl uppercase">
        {dictionary.header.title}
      </h1>
    </div>
  );
};

export default Entete;
