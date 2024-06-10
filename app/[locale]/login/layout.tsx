// import ToggleThemeButton from "../../../components/UI/ToggleTheme";
// import ToggleLanguage from "../../../components/UI/ToggleLanguage";
// import { cookies } from "next/headers";

// export default function LoginLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const cookieStore = cookies();
//   const curr = cookieStore.get("Next-Locale");

//   return (
//     <div className="pages login-container">
//       <div className="button-row">
//         <ToggleThemeButton />
//         <ToggleLanguage curr={curr?.value} />
//       </div>
//       {children}
//     </div>
//   );
// }
