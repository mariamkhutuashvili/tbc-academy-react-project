"use server";

import { cookies } from "next/headers";

export async function changeLanguage() {
  const cookieStore = cookies();
  let curr = cookieStore.get("Next-Locale")?.value || "en";

  const newLocale = curr === "en" ? "ka" : "en";
  cookieStore.set("Next-Locale", newLocale);
}
