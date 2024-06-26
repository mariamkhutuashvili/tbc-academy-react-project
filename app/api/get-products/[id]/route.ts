import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.replace("/api/get-products/", "");

  try {
    const products = await sql`SELECT * FROM products WHERE id = ${Number(id)}`;

    //Join tables
    const reviews =
      await sql`SELECT r.id AS id, u.name, u.picture, u.email, u.id as user_id, r.star, r.comment,r.product_id FROM reviews r JOIN users u ON u.id = r.user_id where r.product_id = ${Number(
        id
      )}`;

    return NextResponse.json({ products, reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
