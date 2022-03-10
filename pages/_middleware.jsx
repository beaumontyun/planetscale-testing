import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname === "/input") {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    const session = await getSession({ req });
    if (!session) return NextResponse.redirect(url);
  }
  return NextResponse.next();
}