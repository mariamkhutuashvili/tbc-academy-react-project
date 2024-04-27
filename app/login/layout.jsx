import ToggleThemeButton from "../../components/UI/ToggleTheme";

export default function LoginLayout({ children }) {
  return (
    <div className="pages">
      <ToggleThemeButton />
      {children}
    </div>
  );
}
