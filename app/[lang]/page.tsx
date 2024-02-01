import { NavBar } from "@/app/Navigation";
import { Locale } from "@/i18n-config";
import Curtain from "../Curtain";
import VideoHome from "./VideoHome";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ButtonHome } from "./ButtonHome";
import { getDictionary } from "@/get-disctionary";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const session = await getServerSession(authOptions);
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
          <ButtonHome dictionary={dictionary} session={session} />
        </div>
        <Curtain />
      </main>
    </>
  );
}
