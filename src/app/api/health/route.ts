import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/song-repository";

export async function GET() {
  try {
    const database = await checkDatabaseHealth();
    return NextResponse.json({
      ok: true,
      database,
      musicProvider: process.env.MUSIC_PROVIDER ?? "mock",
      checkout: process.env.DEMO_CHECKOUT === "false" ? "stripe-pending" : "demo",
    });
  } catch (error) {
    console.error("health_check_failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
