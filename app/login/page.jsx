"use server";

import { login } from "../actions";
import LoginForm from "../../components/LoginForm/LoginForm";
import "../../styles/Login.css";

export default async function Login() {
  const handleLogin = async (username, password) => {
    "use server";
    await login(username, password);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
}
