import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // HEADER
      home: "Home",
      about: "About",
      blog: "Blog",
      contact: "Contact",
      logOut: "Log Out",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System",

      // FOOTER
      quickLinks: "Quick Links",
      information: "Information",
      termsAndConditions: "Terms and Conditions",
      privacyPolicy: "Privacy Policy",
      newsletter: "Newsletter",
      subscribeToOurNewsletter: "Subscribe to our newsletter:",
      enterYourEmail: "Enter Your Email",
      subscribe: "Subscribe",

      // PRODUCTS PAGE
      onlineStore: "Online Store",
      searchProducts: "Search Products...",
      search: "Search",
      sortByPrice: "Sort by Price",
      reset: "Reset",
      addToCart: "Add to Cart",

      //ABOUT PAGE
      headline: "Your Story Starts With Us.",
      learnMore: "Learn More",

      // BLOG PAGE
      readMore: "Read More",
      archive: "Archive",

      // CONTACT PAGE
      contactUs: "Contact Us",
      email: "Email",
      phone: "Phone",
      address: "Address",
      name: "Name",
      yourName: "Your name...",
      yourEmail: "Your email...",
      writeSomething: "Write something...",
      subject: "Subject",
      message: "Message",
      send: "Send",

      // PROFILE PAGE
      userInformation: "User Information",
      changePassword: "Change Password",
      newPassword: "New Password",
      confirmNewPassword: "Confirm New Password",
      save: "Save",

      // LOGIN PAGE
      username: "Username",
      // login: "Login",
    },
  },

  ge: {
    translation: {
      // HEADER
      home: "მთავარი",
      about: "ჩვენ შესახებ",
      blog: "ბლოგი",
      contact: "კონტაქტი",
      logOut: "გასვლა",
      theme: "თემა",
      light: "ღია",
      dark: "მუქი",
      system: "სისტემა",

      // FOOTER
      quickLinks: "სწრაფი ლინკები",
      information: "ინფორმაცია",
      termsAndConditions: "წესები და პირობები",
      privacyPolicy: "კონფიდენციალურობის პოლიტიკა",
      newsletter: "სიახლეები",
      subscribeToOurNewsletter: "გამოიწერეთ სიახლეები:",
      enterYourEmail: "შეიყვანეთ თქვენი მეილი",
      subscribe: "გამოწერა",

      // PRODUCTS PAGE
      onlineStore: "ონლაინ მაღაზია",
      searchProducts: "მოძებნე პროდუქტები...",
      search: "ძიება",
      sortByPrice: "ფასით დალაგება",
      reset: "დალაგების გაუქმება",
      addToCart: "კალათაში დამატება",

      //ABOUT PAGE
      headline: "შენი მოგზაურობა იწყება აქ.",
      learnMore: "გაიგე მეტი",

      // BLOG PAGE
      readMore: "წაიკითხე მეტი",
      archive: "არქივი",

      // CONTACT PAGE
      contactUs: "დაგვიკავშირდი",
      email: "მეილი",
      phone: "ტელეფონი",
      address: "მისამართი",
      name: "სახელი",
      yourName: "შენი სახელი...",
      yourEmail: "შენი მეილი...",
      writeSomething: "დაწერე ტექსტი...",
      subject: "თემა",
      message: "წერილი",
      send: "გაგზავნა",

      // PROFILE PAGE
      userInformation: "მომხმარებლის ინფორმაცია",
      changePassword: "შეცვალე პაროლი",
      newPassword: "ახალი პაროლი",
      confirmNewPassword: "გაიმეორეთ ახალი პაროლი",
      save: "შენახვა",

      // LOGIN PAGE
      username: "მომხმარებელი",
      // login: "შესვლა",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
