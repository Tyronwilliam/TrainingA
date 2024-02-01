import { NavBar } from "@/app/Navigation";
import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import Curtain from "../Curtain";
import { ButtonHome } from "./ButtonHome";
import VideoHome from "./VideoHome";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <main
        className="relative w-full h-screen min-h-[400px] "
        style={{ height: "100vh" }}
      >
        <NavBar lang={lang} />
        <div
          className="relative w-full "
          style={{ height: "calc(100vh - 90px)" }}
        >
          <VideoHome />
          <ButtonHome dictionary={dictionary} />
        </div>
        <Curtain />
      </main>
    </>
  );
}
