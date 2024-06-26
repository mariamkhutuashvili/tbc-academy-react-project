import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

type Products = {
  [key: string]: number;
};

export async function PUT(req: NextRequest) {
  try {
    const { userId, productId, quantity } = await req.json();

    const result = await sql`
      SELECT products FROM cart
      WHERE user_id = ${Number(userId)}
    `;

    let products: Products = {};

    if (result.rowCount > 0) {
      products = result.rows[0].products || {};
    }

  

    if (products[productId]) {
      products[productId] -= quantity;

      if (products[productId] <= 0) {
        delete products[productId];
      }
    }

    const updatedCart = await sql`
      UPDATE cart
      SET products = ${JSON.stringify(products)}::jsonb
      WHERE user_id = ${Number(userId)}
      RETURNING *
    `;

    return NextResponse.json({ updatedCart }, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
