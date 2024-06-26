import { ReactElement } from "react";
import { I18nProviderClient } from "../../locales/client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactElement;
}) {
  return (
    <html lang={locale}>
      <body>
        <I18nProviderClient locale={locale}>
          <UserProvider>{children}</UserProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}
