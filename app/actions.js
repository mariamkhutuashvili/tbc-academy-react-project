import { AUTH_COOKIE_KEY } from "../constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(username, password) {
  "use server";

  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const user = await response.json();

  if (user.token) {
    const cookieStore = cookies();
    cookieStore.set(AUTH_COOKIE_KEY, JSON.stringify(user));
  } else {
    throw new Error(user.message);
  }
}

export async function logout() {
  "use server";
  const cookieStore = cookies();

  cookieStore.delete(AUTH_COOKIE_KEY);
  redirect("/login");
}
