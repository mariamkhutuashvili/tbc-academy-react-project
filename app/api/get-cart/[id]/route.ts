import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      throw new Error("User ID is required");
    }

    const cart = await sql`SELECT * FROM cart WHERE user_id = ${Number(id)}`;

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching cart:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
