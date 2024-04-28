import { cookies } from "next/headers";
import { AUTH_COOKIE_KEY } from "../../../constants";

export async function POST() {
  try {
    const cookieStore = cookies();

    cookieStore.delete(AUTH_COOKIE_KEY);
    return Response.json({ message: "Success" });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
