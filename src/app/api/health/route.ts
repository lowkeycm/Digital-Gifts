import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/song-repository";
import { betaReady } from "@/lib/beta-config";
import { publicCheckoutMode } from "@/lib/payments";
export async function GET(){try{
 await checkDatabaseHealth();
 return NextResponse.json({ok:true,musicProvider:betaReady()?"kie":"setup-pending",checkout:publicCheckoutMode(),mode:"customer"});
}catch{return NextResponse.json({ok:false},{status:503});}}
