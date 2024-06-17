import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.replace("/api/update-product/", "");
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

  try {
    if (!id) throw new Error("ID is required");

    const photo_galleryJson = JSON.stringify(photo_gallery);

    await sql`
      UPDATE products 
      SET title=${title}, description=${description}, price=${price}, discountprice=${discountprice}, stock=${stock},  category=${category}, brand=${brand}, photo_gallery=${photo_galleryJson}
      WHERE id=${id};
    `;

    const products = await sql`SELECT * FROM products ORDER BY id ASC;`;
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
