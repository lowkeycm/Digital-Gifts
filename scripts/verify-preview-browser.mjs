import http from 'node:http';
import {spawn,execFileSync} from 'node:child_process';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import assert from 'node:assert/strict';
import Module,{createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const qaRequire=createRequire(path.join(process.env.STUDIO_QA_RUNTIME??path.join(root,'..','qa-runtime'),'package.json'));
const {chromium}=qaRequire('playwright'),cm=qaRequire('@sparticuz/chromium'),chrome=cm.default??cm;
const require=createRequire(import.meta.url),orig=Module._load;
Module._load=function(id,...args){if(id==='server-only')return {};return orig.call(this,id,...args)};
Module._extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,f);
const {createAudioPreview}=require('../src/lib/audio-preview.ts');
const source=fs.readFileSync(root+'/public/audio/the-way-i-see-you.mp3');
const clip=await createAudioPreview(source);
const clipFile=path.join(root,'..','preview-qa.mp3');await fsp.writeFile(clipFile,clip);
const duration=Number(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',clipFile],{encoding:'utf8'}));
assert.ok(duration>=59.9&&duration<60.1);assert.ok(clip.length<source.length);
await assert.rejects(()=>createAudioPreview(Buffer.from('not an audio file')));
const id='11111111-1111-4111-8111-111111111111',owner='22222222-2222-4222-8222-222222222222',gift='33333333-3333-4333-8333-333333333333',t1='44444444-4444-4444-8444-444444444444',t2='55555555-5555-4555-8555-555555555555',job='77777777-7777-4777-8777-777777777777';
const session={id,access_token:owner,gift_token:gift,selected_track_id:null,gift_photo_id:null,reaction_asset_id:null,checkout_mode:'test',payment_status:'pending',raw_answers:{recipientName:'Jennifer',genre:'Acoustic',occasion:'Anniversary'},created_at:'2026-10-03T00:00:00Z'};
const tracks=[t1,t2].map((id,i)=>({id,session_id:session.id,job_id:job,title:i?'Always You':'Every Little Thing',lyrics:'Private full lyrics for the whole song.',storage_path:`version-${i}.mp3`,preview_storage_path:`version-${i}.preview.mp3`,duration:245}));
const tables={song_beta_sessions:[session],song_beta_tracks:tracks,song_beta_jobs:[{id:job,session_id:id,kind:'original',status:'complete',created_at:session.created_at}],song_beta_feedback:[],song_beta_media:[],song_checkout_orders:[]};
const signed=[];let originalReservations=0;
const fixture=http.createServer(async(req,res)=>{const u=new URL(req.url,'http://127.0.0.1:4133');let raw='';for await(const c of req)raw+=c;const b=raw?JSON.parse(raw):{};res.setHeader('Content-Type','application/json');const send=(s,v)=>{res.statusCode=s;res.end(JSON.stringify(v))};
 if(u.pathname.startsWith('/storage/v1/object/sign/')){signed.push({path:u.pathname,...b});return send(200,{signedURL:'/object/public/'+u.pathname.split('/').at(-1)})}
 if(u.pathname.startsWith('/storage/v1/object/public/')){res.setHeader('Content-Type','audio/mpeg');const bytes=u.pathname.includes('.preview.')?clip:source;res.setHeader('Accept-Ranges','bytes');const range=/bytes=(\d+)-(\d*)/.exec(req.headers.range??'');if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),bytes.length-1):bytes.length-1;res.statusCode=206;res.setHeader('Content-Range',`bytes ${start}-${end}/${bytes.length}`);res.setHeader('Content-Length',end-start+1);res.end(bytes.subarray(start,end+1));}else{res.setHeader('Content-Length',bytes.length);res.end(bytes);}return}
 const name=u.pathname.split('/').at(-1);
 if(name==='reserve_beta_job'){assert.equal(b.p_kind,'original');originalReservations++;return send(200,tables.song_beta_jobs[0])}
 if(name==='claim_beta_sync')return send(200,[]);
 if(!tables[name])return send(404,{});
 let rows=tables[name].filter(r=>[...u.searchParams].every(([k,v])=>!v.startsWith('eq.')||String(r[k])===v.slice(3)));
 if(req.method==='PATCH'){rows.forEach(r=>Object.assign(r,b));return send(200,rows.filter(r=>r.status==='submitting'))}
 return send(200,req.headers.accept?.includes('vnd.pgrst.object')?(rows[0]??null):rows);
});
await new Promise(r=>fixture.listen(4133,'127.0.0.1',r));
const origin='http://127.0.0.1:3133';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','3133','-H','127.0.0.1'],{cwd:root,env:{...process.env,SUPABASE_URL:'http://127.0.0.1:4133',SUPABASE_SECRET_KEY:'fixture-only',KIE_API_KEY:'fixture-no-provider',STRIPE_SITE_URL:origin,STRIPE_TEST_SECRET_KEY:'sk_test_fixture',STRIPE_TEST_WEBHOOK_SECRET:'whsec_fixture',CHECKOUT_MODE:'free'},stdio:['ignore','pipe','pipe']});let logs='';server.stdout.on('data',c=>logs+=c);server.stderr.on('data',c=>logs+=c);
let browser;const checks=[];function pass(s){checks.push(s);console.log('PASS',s)}
try{
 for(let n=0;n<80;n++){try{if((await fetch(origin+'/api/health')).ok)break}catch{}await new Promise(r=>setTimeout(r,200))}
 pass('Real FFmpeg produces a playable 60-second file and rejects invalid audio');
 browser=await chromium.launch({executablePath:await chrome.executablePath(),args:chrome.args,headless:true});const ctx=await browser.newContext();const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const studio=`${origin}/song/${id}?key=${owner}`,audio=`${origin}/api/songs/${id}/audio?key=${owner}&track=${t1}`;
 let r=await page.request.get(origin+'/api/songs/'+id,{headers:{'x-song-key':owner}}),state=await r.json();assert.equal(r.status(),200);assert.equal(state.checkout.previewReady,true);assert.equal(state.giftToken,null);assert.ok(state.tracks.every(t=>!t.lyrics&&t.duration===60));pass('Unpaid state exposes previews and no gift token or full lyrics');
 r=await page.request.get(audio,{maxRedirects:0});assert.equal(r.status(),307);assert.ok(r.headers().location.includes('.preview.mp3'));assert.equal(signed.at(-1).expiresIn,300);assert.equal((await page.request.get(audio+'&download=1',{maxRedirects:0})).status(),402);
 assert.equal((await page.request.get(`${origin}/api/songs/${id}/audio?key=${gift}&track=${t1}&gift=1`,{maxRedirects:0})).status(),404);
 assert.equal((await page.request.get(`${origin}/gift/${id}?key=${gift}`)).status(),404);
 assert.equal((await page.request.get(audio.replace(owner,gift),{maxRedirects:0})).status(),404);pass('Unpaid audio signs only the physical clip; downloads and recipient/invalid keys are denied');
 const post=(route,data)=>page.request.post(origin+route,{headers:{origin,'content-type':'application/json'},data:{songId:id,accessToken:owner,...data}});
 assert.equal((await post('/api/song-gift',{trackId:t1})).status(),402);
 assert.equal((await post('/api/revisions',{notes:'Make the guitar gentler',requestId:crypto.randomUUID()})).status(),402);
 assert.equal((await post('/api/song-retry',{kind:'revision'})).status(),402);
 assert.equal((await post('/api/song-uploads',{action:'prepare',requestId:crypto.randomUUID(),kind:'photo',mime:'image/jpeg',size:512,consent:true})).status(),402);pass('Gift preparation, revision requests/retries and uploads are enforced on the server');
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:width===1440?900:844});await page.goto(studio);await page.getByRole('button',{name:'Unlock my full songs',exact:true}).waitFor();
  assert.equal(await page.locator('audio').count(),2);assert.equal(await page.getByRole('link',{name:'Download MP3'}).count(),0);assert.equal(await page.getByText('Read the lyrics',{exact:true}).count(),0);
  const order=await page.evaluate(()=>({audio:document.querySelector('audio').getBoundingClientRect().top,offer:document.querySelector('.song-offer').getBoundingClientRect().top}));assert.ok(order.offer>order.audio);
  await page.locator('audio').first().evaluate(async a=>{a.load();await a.play()});await page.waitForFunction(()=>document.querySelector('audio')?.currentTime>0);
  const played=await page.locator('audio').first().evaluate(a=>({duration:a.duration,time:a.currentTime}));assert.ok(played.duration>=59.9&&played.duration<60.1);await page.locator('audio').first().evaluate(async a=>{a.currentTime=59;await a.play()});await page.waitForFunction(()=>document.querySelector('audio')?.ended);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:root+`/docs/qa/preview-before-checkout-${width}.jpg`,type:'jpeg',quality:80,fullPage:true});pass('Previews play and end at 60 seconds before the purchase offer '+width);
 }
 await page.route('**/api/checkout',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'Checkout could not open. Your previews are saved.'})}));await page.getByRole('button',{name:'Unlock my full songs',exact:true}).click();await page.getByRole('alert').filter({hasText:'previews are saved'}).waitFor();assert.equal(await page.locator('audio').count(),2);assert.ok(await page.getByRole('button',{name:'Unlock my full songs',exact:true}).isEnabled());await page.unroute('**/api/checkout');pass('Checkout failure preserves both previews and enables retry');
 // Simulate the already-verified signed-payment transition in the controlled DB.
 session.payment_status='paid';const before=originalReservations;await page.getByRole('button',{name:'Check my payment',exact:true}).click();await page.getByRole('link',{name:'Download MP3'}).first().waitFor();
 assert.equal(await page.getByRole('button',{name:'Unlock my full songs'}).count(),0);assert.equal(await page.getByRole('link',{name:'Download MP3'}).count(),2);assert.match(await page.locator('body').innerText(),/3 revisions remaining/i);assert.equal(originalReservations,before+1);r=await page.request.get(audio+'&download=1',{maxRedirects:0});assert.equal(r.status(),307);assert.ok(!r.headers().location.includes('.preview.'));pass('Payment unlocks the same two full tracks, downloads and three revisions');
 r=await post('/api/song-gift',{trackId:t2});assert.equal(r.status(),200);r=await page.request.get(`${origin}/api/songs/${id}/audio?key=${gift}&track=${t1}&gift=1`,{maxRedirects:0});assert.equal(r.status(),404);r=await page.request.get(`${origin}/api/songs/${id}/audio?key=${gift}&track=${t2}&gift=1`,{maxRedirects:0});assert.equal(r.status(),307);await page.goto(`${origin}/song/${id}/preview?key=${owner}`);await page.getByRole('heading',{name:'Ready for their first listen?'}).waitFor();await page.goto(`${origin}/gift/${id}?key=${gift}`);assert.equal(await page.locator('audio').count(),1);pass('Unlocked sender preview and recipient gift use only the selected version');
 for(const width of [1440,390]){await page.setViewportSize({width,height:width===1440?900:844});await page.goto(studio);await page.getByRole('link',{name:'Download MP3'}).first().waitFor();await page.screenshot({path:root+`/docs/qa/preview-unlocked-${width}.jpg`,type:'jpeg',quality:80,fullPage:true});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))}
 session.checkout_mode='free';session.payment_status='not_required';tracks.forEach(t=>t.preview_storage_path=null);await page.goto(studio);await page.getByRole('link',{name:'Download MP3'}).first().waitFor();r=await page.request.get(audio,{maxRedirects:0});assert.equal(r.status(),307);assert.ok(!r.headers().location.includes('.preview.'));pass('Existing free songs retain full access without preview files or checkout');
 for(const width of [320,768]){await page.setViewportSize({width,height:900});await page.goto(studio);await page.getByRole('link',{name:'Download MP3'}).first().waitFor();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))}assert.deepEqual(errors,[]);pass('320/768 layouts and client runtime pass');
 const trace=JSON.parse(fs.readFileSync(root+'/.next/server/app/api/music/callback/route.js.nft.json','utf8'));assert.ok(trace.files.some(p=>p.endsWith('/ffmpeg-static/ffmpeg')));pass('Production function trace contains the FFmpeg executable');
 await fsp.writeFile(root+'/docs/qa/preview-browser-checks.json',JSON.stringify({environment:'Actual production Next build, real Supabase SDK with controlled REST/storage, real FFmpeg and supplied sample MP3. Payment transition controlled; signature/Stripe API contract verified separately. No real charge, generation credits or customer data.',clipDuration:duration,checks},null,2)+'\n');
}catch(e){console.error(logs);throw e}finally{if(browser)await browser.close();server.kill();fixture.close()}
