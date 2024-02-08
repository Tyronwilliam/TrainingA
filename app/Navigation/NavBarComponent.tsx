import { Locale } from "@/i18n-config";
import { Dictionary } from "@/types/dictionary";
import { LinkItemProps } from "@/types/generic";
import { useSession } from "next-auth/react";
import Link from "next/link";
import List from "./List";

type Props = {
  dictionary: Dictionary;
  classStyles: string;
  lang: Locale;
};
export function NavBarComponent({ dictionary, classStyles, lang }: Props) {
  const { data: session } = useSession();

  const isFrench = lang;
  const filteredItems = dictionary.header.nav.filter((item: any) => {
    if (isFrench === "fr") {
      // En français
      return (
        !(item.link === "auth/connexion" && session) &&
        !(item.link === "auth/profil" && !session) &&
        !(
          item.link === "auth/profil" &&
          //@ts-ignore
          session?.user?.role !== "Regular"
        )
      );
    } else {
      // En anglais
      return (
        !(item.link === "en/auth/connexion" && session) &&
        !(item.link === "en/auth/profil" && !session) &&
        !(
          item.link === "en/auth/profil" &&
          //@ts-ignore
          session?.user?.role !== "Regular"
        )
      );
    }
  });
  return (
    <nav className="mx-auto w-fit">
      <List
        items={filteredItems}
        resourceName="linkItem"
        itemComponent={LinkItemComponent}
        liStyle="text-lg text-center md:text-xl uppercase"
        gap="gap-2"
      />
    </nav>
  );
}
export function LinkItemComponent({ linkItem }: LinkItemProps) {
  const { label, link } = linkItem;
  return <Link href={`/${link}`}>{label}</Link>;
}
