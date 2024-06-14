import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result =
      await sql`CREATE TABLE users ( id SERIAL PRIMARY KEY, Name varchar(255), Email varchar(255), sub VARCHAR(255), picture TEXT, role varchar(255), phone VARCHAR(255), address varchar(255) );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
