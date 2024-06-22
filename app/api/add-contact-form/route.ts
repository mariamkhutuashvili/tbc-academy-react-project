import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  try {
    if (!name || !phone || !email)
      throw new Error("Name, phone, and email are required");
    await sql`INSERT INTO contact_form (name, email, phone, message) VALUES (${name}, ${email}, ${phone}, ${message});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const contacts = await sql`SELECT * FROM contact_form`;
  return NextResponse.json({ contacts }, { status: 200 });
}
