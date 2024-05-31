import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255),
      category VARCHAR(255),
      price NUMERIC(10, 2) NOT NULL,
      discountPrice NUMERIC(10, 2),
      stock INTEGER,
      brand VARCHAR(255)
    )
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
