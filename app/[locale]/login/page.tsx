import LoginForm from "../../../components/loginForm/LoginForm";
import { getI18n } from "../../../locales/server";
import "../../../styles/Login.css";

export default async function Login() {
  const t = await getI18n();

  return (
    <div className="login-container">
      <h1>{t("login")}</h1>
      <LoginForm />
    </div>
  );
}
