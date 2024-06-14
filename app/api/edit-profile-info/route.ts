import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userSub, nickname, phone, address } = await request.json();

  try {
    await sql`UPDATE users SET name=${nickname}, phone=${phone}, address=${address} WHERE sub=${userSub};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  let users;
  try {
    users = await sql`SELECT * FROM users ORDER BY sub ASC;`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ users }, { status: 200 });
}
