import Title from "../../../components/UI/Title";
import { getI18n } from "../../../locales/server";
import "../../../styles/Home.css";

export const metadata = {
  title: "Home",
  description: "Home - Welcome to Our Website",
};

export default async function Home() {
  const t = await getI18n();

  return (
    <main className="home">
      <Title titleName={t("headline")} />
    </main>
  );
}
