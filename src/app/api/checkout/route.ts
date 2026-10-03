import { NextResponse } from "next/server";
export async function POST(){return NextResponse.json({error:"Checkout is unavailable. Start your song from the story form."},{status:410});}
