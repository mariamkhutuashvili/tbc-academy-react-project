"use client";

import { useState } from "react";

export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log("Login attempt with:", username, password);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(username, password);
      }}
    >
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="button">
        Login
      </button>
    </form>
  );
}