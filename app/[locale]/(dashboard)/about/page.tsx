import { getI18n } from "../../../../locales/server";
import Title from "../../../../components/UI/Title";
import "../../../../styles/About.css";

export default async function About() {
  const t = await getI18n();
  return (
    <main className="about">
      <Title titleName={t("headline")} />
    </main>
  );
}
