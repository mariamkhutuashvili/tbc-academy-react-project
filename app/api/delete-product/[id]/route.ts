import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.replace("/api/delete-product/", "");

  try {
    if (!id) throw new Error("ID is required");

    // Delete the product from the products table
    await sql`DELETE FROM products WHERE id = ${+id};`;

    // Fetch all carts containing the product
    const cartsWithProduct = await sql`
      SELECT user_id, products
      FROM cart
      WHERE products ? ${id}
    `;

    // Update each cart to remove the product
    for (const cart of cartsWithProduct.rows) {
      delete cart.products[id];

      await sql`
        UPDATE cart
        SET products = ${JSON.stringify(cart.products)}::jsonb
        WHERE user_id = ${cart.user_id}
      `;
    }

    const products = await sql`SELECT * FROM products;`;

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
