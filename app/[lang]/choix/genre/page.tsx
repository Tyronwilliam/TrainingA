import List from "@/app/Navigation/List";
import { LinkItemComponent } from "@/app/Navigation/NavBarComponent";
import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import React from "react";
import PreviousNavHistory from "../../components/PreviousNavHistory";
import { redirect } from "next/navigation";

const ChoixPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(lang);
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/restreint");
  }
  if (
    //@ts-ignore
    session.user.role === "Regular" ||
    //@ts-ignore
    (!session.user.actif && session.user.role !== "Admin")
  ) {
    redirect("/restreint");
  }
  return (
    <>
      <PreviousNavHistory />
      <main
        className="w-full  h-fit m-auto pt-5  flex flex-col "
        style={{ minHeight: "calc(100vh - 48px)" }}
      >
        <section className="grow flex flex-col w-full h-full items-center justify-center text-xl">
          <List
            items={dictionary?.genre?.choices}
            resourceName="linkItem"
            itemComponent={LinkItemComponent}
            liStyle="text-2xl text-center md:text-3xl uppercase"
            gap="gap-10 md:gap-28"
          />
        </section>
      </main>
    </>
  );
};

export default ChoixPage;
