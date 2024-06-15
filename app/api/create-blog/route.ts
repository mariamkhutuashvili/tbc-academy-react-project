import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, description, photo } = await request.json();

  try {
    if (!title || !description)
      throw new Error("title and description are required");
    await sql`INSERT INTO blogs (title, description, photo) VALUES (${title}, ${description}, ${photo});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  try {
    const blogs = await sql`SELECT
      id,
      title,
      description,
      photo,
      date_added
    FROM blogs`;

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
