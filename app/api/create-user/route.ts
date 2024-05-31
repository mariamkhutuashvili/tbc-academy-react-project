import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, age } = await request.json();

  try {
    if (!name || !email || !age)
      throw new Error("name, email and age are required");

    // Insert user into the users table
    await sql`INSERT INTO users (Name, Email, Age) VALUES (${name}, ${email}, ${age});`;

    const users = await sql`SELECT id FROM users ORDER BY id DESC LIMIT 1;`;
    const id = users.rows[0].id;

    await sql`
      INSERT INTO cart (user_id, products) 
      VALUES (${id}, '{}');
    `;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const users = await sql`SELECT * FROM users;`;

  return NextResponse.json({ users }, { status: 200 });
}
