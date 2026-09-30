import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/song-repository";
import { betaReady } from "@/lib/beta-config";
export async function GET(){try{
 await checkDatabaseHealth();
 return NextResponse.json({ok:true,musicProvider:betaReady()?"kie":"setup-pending",checkout:"disabled",mode:"free-test"});
}catch{return NextResponse.json({ok:false},{status:503});}}
