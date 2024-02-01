import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import NavLayout from "./NavLayout";
const NavBar = async ({ lang }: { lang: Locale }) => {
  const dictionary = await getDictionary(lang);

  return (
    <header className="relative w-full h-[90px]  p-4 flex flex-col gap-4 z-50 md:p-6 bg-black">
      <NavLayout dictionary={dictionary} lang={lang} />
    </header>
  );
};

export default NavBar;
