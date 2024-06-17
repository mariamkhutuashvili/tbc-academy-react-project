import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      price,
      discountprice,
      stock,
      category,
      brand,
      photo_gallery,
    } = await request.json();

    // Validation
    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    // Convert image_gallery to JSON string
    const photo_galleryJson = JSON.stringify(photo_gallery);

    // Insert into database
    await sql`
      INSERT INTO products ( title, description, price, discountprice, stock, category, brand, photo_gallery)
      VALUES (${title}, ${description}, ${price}, ${discountprice}, ${stock}, ${category}, ${brand}, ${photo_galleryJson}::jsonb);
    `;

    // Fetch all products
    const products = await sql`
      SELECT *
      FROM products
    `;

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
