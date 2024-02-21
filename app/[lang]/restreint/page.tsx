import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import PreviousNavHistory from "../components/PreviousNavHistory";
import { RiLockFill } from "react-icons/ri";
import Link from "next/link";

export default async function Restreint({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <PreviousNavHistory />
      <main className="w-full min-h-full flex items-center justify-center flex-col">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <RiLockFill className="w-full h-[300px]" />
        </div>
        <section className="text-xl max-w-[360px] flex text-center">
          <p>
            {dictionary?.general?.restricted?.p}
            <Link href={"/contact"} className="ml-1 uppercase hover:opacity-55">
              {dictionary?.general?.restricted?.link}
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
