import { NextResponse } from "next/server";
import { intakeSchema, buildMusicBrief } from "@/lib/intake";
import { getMusicProvider } from "@/lib/music";
import { createIntake, recordGeneration } from "@/lib/song-repository";

export async function POST(request: Request) {
  try {
    const parsed = intakeSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please complete the required story details." }, { status: 400 });
    }

    const musicBrief = buildMusicBrief(parsed.data);
    const intake = await createIntake(parsed.data, musicBrief);
    const provider = getMusicProvider();
    const generation = await provider.generate({ brief: musicBrief, kind: "preview" });
    await recordGeneration({ intakeId: intake.id, accessToken: intake.accessToken, kind: "preview", result: generation });

    return NextResponse.json({ id: intake.id, accessToken: intake.accessToken });
  } catch (error) {
    console.error("intake_create_failed", error);
    return NextResponse.json({ error: "We could not create your preview. Please try again." }, { status: 500 });
  }
}
