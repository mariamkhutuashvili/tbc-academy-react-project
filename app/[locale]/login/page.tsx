"use client";

import { useI18n } from "../../../locales/client";
import LoginForm from "../../../components/loginForm/LoginForm";
import "../../../styles/Login.css";

export default function Login() {
  const t = useI18n();

  return (
    <div className="login-container">
      <h1>{t("login")}</h1>
      <LoginForm />
    </div>
  );
}
