"use client";

import { useState } from "react";
import { handleLogin } from "../../scripts/login";

export default function LoginForm() {
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
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="button login-button">
        Login
      </button>
    </form>
  );
}
