import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { user_id, product_id, star, comment } = await request.json();

  try {
    if (!star || !user_id || !product_id)
      throw new Error("Star, user_id and product_id are required");

    const existingReviews = await sql`
      SELECT * FROM reviews
      WHERE user_id = ${user_id} AND product_id = ${product_id}
    `;

    if (existingReviews.rows.length > 0) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO reviews (user_id, product_id, star, comment)
      VALUES (${user_id}, ${product_id}, ${star}, ${comment})
    `;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const reviews = await sql`SELECT * FROM reviews`;
  return NextResponse.json({ reviews }, { status: 200 });
}
