import { NextResponse } from "next/server";
export async function POST(){return NextResponse.json({error:"Checkout is disabled during the free test. New songs are available in full without payment."},{status:410});}
