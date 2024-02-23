import { getDictionary } from "@/get-disctionary";
import Provider from "@/hooks/Authentification/client-provider";
import { PreferencesProvider } from "@/hooks/Basic/usePreferencesProvider";
import PackageProvider from "@/hooks/Package/usePackage";
import { Locale } from "@/i18n-config";
import { authOptions } from "@/utils/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { GoogleProvider } from "./provider/GoogleProvider";

const Roboto = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const session = await getServerSession(authOptions);
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang} className={Roboto.className}>
      <body>
        <GoogleProvider dictionary={dictionary} params={params}>
          <Provider session={session}>
            <PackageProvider>
              <PreferencesProvider>{children}</PreferencesProvider>
            </PackageProvider>
          </Provider>{" "}
        </GoogleProvider>
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  title: "Agence Graziani - Base de données de talents pour le cinéma",
  description:
    "Découvrez l'Agence Graziani, l'agence de casting située à Marseille. Accédez à une vaste base de données de talents comprenant des figurants, acteurs et modèles. Les professionnels du cinéma peuvent nous contacter pour trouver les meilleurs talents pour leurs projets cinématographiques.",
  metadataBase: new URL(
    "https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/A.png"
  ),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "fr-FR": "/fr",
    },
  },
  openGraph: {
    title: "Agence Graziani - Base de données de talents pour le cinéma",
    description:
      "Découvrez l'Agence Graziani, l'agence de casting située à Marseille. Accédez à une vaste base de données de talents comprenant des figurants, acteurs et modèles. Les professionnels du cinéma peuvent nous contacter pour trouver les meilleurs talents pour leurs projets cinématographiques.",
    siteName: "Agence Graziani",
    images: [
      {
        url: "https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/A.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/A.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: ["/favicon.ico?v=1"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};
