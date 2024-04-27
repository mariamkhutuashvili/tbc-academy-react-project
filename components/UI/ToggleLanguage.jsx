import i18n from "../../app/i18n";

const ToggleLanguage = () => {
  const toggleLanguage = () => {
    const nextLanguage = i18n.language === "en" ? "ge" : "en";
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <button onClick={toggleLanguage} className="button translate-button">
      {i18n.language === "en" ? "Geo" : "Eng"}
    </button>
  );
};

export default ToggleLanguage;
