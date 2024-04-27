import i18n from "../../app/i18n";

export default function ToggleLanguage() {
  const toggleLanguage = () => {
    const nextLanguage = i18n.language === "en" ? "ge" : "en";
    i18n.changeLanguage(nextLanguage);
    // localStorage.setItem("i18nextLng", nextLanguage); // Storing the selected language
  };

  return (
    <button onClick={toggleLanguage} className="button translate-button">
      {i18n.language === "en" ? "Geo" : "Eng"}
    </button>
  );
}
