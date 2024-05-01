"use client";

import { useI18n } from "../../locales/client";
import { useState } from "react";
import { handleLogin } from "../../scripts/login";

export default function LoginForm() {
  const t = useI18n();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  console.log("Login attempt with:", username, password);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(username, password).then(() => {
          window.location.reload();
        });
      }}
    >
      <div className="input-group">
        <input
          type="text"
          id="username"
          placeholder={t("username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          id="password"
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="button login-button">
        {t("login")}
      </button>
    </form>
  );
}
