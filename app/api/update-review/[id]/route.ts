import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.replace("/api/update-review/", "");
  const { star, comment, product_id, user_id } = await request.json();

  try {
    if (!id) throw new Error("ID is required");

    await sql`UPDATE reviews SET star=${star},comment=${comment},product_id=${product_id}, user_id=${user_id} WHERE id = ${+id};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const reviews = await sql`SELECT * FROM reviews ORDER BY id ASC;`;

  return NextResponse.json({ reviews }, { status: 200 });
}
