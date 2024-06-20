import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const result = await sql`
    CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        star INTEGER NOT NULL CHECK (star >= 1 AND star <= 5),
        product_id INTEGER NOT NULL,
        comment TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
      `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
