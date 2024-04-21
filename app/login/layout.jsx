import ToggleThemeButton from "../../components/toggleTheme/ToggleTheme";

export default function LoginLayout({ children }) {
  return (
    <div className="pages">
      <ToggleThemeButton />
      {children}
    </div>
  );
}
