import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const result = await sql`
      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        products JSONB NOT NULL DEFAULT '{}'::jsonb,
        added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
      `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
