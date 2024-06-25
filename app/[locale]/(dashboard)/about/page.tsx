import { getI18n } from "../../../../locales/server";
import Image from "next/image";
import "../../../../styles/About.css";

export const metadata = {
  title: "About Us",
  description: "About Us - Learn More About Our Company",
};

export default async function About() {
  const t = await getI18n();
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <div className="image-container">
          <Image
            src="/assets/cat.png" // Change to your photo path
            alt="Main Photo"
            width={500}
            height={500}
            className="main-image"
          />
        </div>
        <div className="text-container">
          <span className="about-us-label">{t("aboutUs")}</span>
          <h1>{t("makeYourCatHappy")}</h1>
          <p>{t("welcomeText")}</p>

          <h2>{t("ourStory")}</h2>
          <p>{t("ourStoryText")}</p>
        </div>
      </div>
      <div className="more-info">
        <h2>{t("whatWeOffer")}</h2>
        <div className="cards-container">
          <div className="card food-card">
            <Image
              src="/assets/food.png"
              alt="Cat Food"
              width={100}
              height={100}
              className="card-icon"
            />
            <div className="card-info">
              <h3>{t("catFood")}</h3>
              <p className="description">{t("catFoodDescription")}</p>
            </div>
          </div>
          <div className="card toy-card">
            <Image
              src="/assets/toys.png"
              alt="Playtime Toys"
              width={100}
              height={100}
              className="card-icon"
            />
            <div className="card-info">
              <h3>{t("playtimeToys")}</h3>
              <p className="card-description">{t("playtimeToysDescription")}</p>
            </div>
          </div>
          <div className="card bed-card">
            <Image
              src="/assets/beds.png"
              alt="Cat Beds"
              width={100}
              height={100}
              className="card-icon"
            />
            <div className="card-info">
              <h3>{t("catBeds")}</h3>
              <p className="card-description">{t("catBedsDescription")}</p>
            </div>
          </div>
          <div className="card accessories-card">
            <Image
              src="/assets/accessories.png"
              alt="Cat Accessories"
              width={100}
              height={100}
              className="card-icon"
            />
            <div className="card-info">
              <h3>{t("catAccessories")}</h3>
              <p className="card-description">
                {t("catAccessoriesDescription")}
              </p>
            </div>
          </div>
          <div className="card grooming-card">
            <Image
              src="/assets/grooming.png"
              alt="Grooming Essentials"
              width={100}
              height={100}
              className="card-icon"
            />
            <div className="card-info">
              <h3>{t("groomingEssentials")}</h3>
              <p className="card-description">
                {t("groomingEssentialsDescription")}
              </p>
            </div>
          </div>
          <div className="card litter-card">
            <Image
              src="/assets/litter.png"
              alt="Cat Litter"
              width={100}
              height={100}
              className="card-icon"
            />
            <div className="card-info">
              <h3>{t("catLitter")}</h3>
              <p className="card-description">{t("catLitterDescription")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
