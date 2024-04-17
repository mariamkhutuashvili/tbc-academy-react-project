"use server";

import { AUTH_COOKIE_KEY } from "../../constants";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { login } from "../actions";
import LoginForm from "../../components/LoginForm/LoginForm";
import "../../styles/Login.css";

export default async function Login() {
  const cookieStore = cookies();
  const cookie = cookieStore.get(AUTH_COOKIE_KEY);

  console.log("cookie:", cookie);

  if (cookie) {
    redirect("/");
  }

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
