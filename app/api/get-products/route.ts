import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const products =
      await sql`SELECT id,title,description,price,discountprice,stock,category,brand,photo_gallery FROM products ORDER BY id ASC;`;
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
