import ToggleThemeButton from "../../components/UI/ToggleTheme";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pages">
      <ToggleThemeButton />
      {children}
    </div>
  );
}
