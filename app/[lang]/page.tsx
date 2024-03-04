import { NavBar } from "@/app/Navigation";
import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import Curtain from "./components/Curtain";
import { ButtonHome } from "./components/ButtonHome";
import VideoHome from "./components/VideoHome";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <main
        className="relative w-full h-screen min-h-[400px] mb-4"
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
