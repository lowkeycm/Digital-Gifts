import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url), sharp = require('sharp');
const qa = createRequire(path.join(process.env.STUDIO_QA_RUNTIME ?? path.join(root,'..','qa-runtime'),'package.json'));
const {chromium} = qa('playwright'), cm = qa('@sparticuz/chromium'), chrome = cm.default ?? cm;
const exports = {};
new Function('exports', ts.transpileModule(await fs.readFile(root+'/src/lib/studio-preview.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(exports);
const base = exports.studioPreview;
const photo = (await fs.readFile(root+'/public/images/album-brother-to-sister.webp')).toString('base64');
const origin = 'http://127.0.0.1:3136';
const server = spawn(process.execPath,['node_modules/next/dist/bin/next','start','-H','127.0.0.1','-p','3136'],{cwd:root,stdio:['ignore','pipe','pipe'],env:{...process.env,VERCEL_ENV:'preview'}});
let logs='', browser; server.stdout.on('data',c=>logs+=c); server.stderr.on('data',c=>logs+=c);
const checks=[];
try {
  for(let n=0;n<100&&!logs.includes('Ready in');n++) await new Promise(r=>setTimeout(r,100));
  assert.ok(logs.includes('Ready in'));
  browser=await chromium.launch({executablePath:await chrome.executablePath(),args:chrome.args,headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/studio-preview/gift');
  await page.locator('.gift-page').waitFor();
  const seed=async (template, scene='record', image=photo, note='Every ordinary day with you is my favorite.', mime='image/webp')=>{
    await page.evaluate(async ({state,template,scene,image,note,mime})=>{
      const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('song-studio-design-preview',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
      await new Promise((resolve,reject)=>{const tx=db.transaction('drafts','readwrite');tx.objectStore('drafts').put({state:{...state,selectedTrackId:state.tracks[1].id,giftTemplate:template,giftScene:scene,giftMessage:note},step:'prepare',photo:image?new Blob([Uint8Array.from(atob(image),c=>c.charCodeAt(0))],{type:mime}):null},'current');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});db.close();
    },{state:base,template,scene,image,note,mime});
    await page.reload(); await page.locator('.gift-page--'+template).waitFor();
    if(image) await page.locator('.gift-photo img').evaluate(i=>i.decode());
    await page.evaluate(()=>document.fonts.ready);
  };
  const tones = {};
  for(const [name,hz] of [['bass',125],['treble',4000]]) {
    const file=path.join(root,'..',`gift-tone-${name}.wav`);
    const {execFileSync}=await import('node:child_process');
    execFileSync('ffmpeg',['-y','-v','error','-f','lavfi','-i',`sine=frequency=${hz}:duration=8`,'-af','volume=2',file]);
    tones[name]=await fs.readFile(file);
  }
  for(const scene of ['teddy','equalizer','record']) {
    for(const template of ['record','portrait','letter']) {
      await seed(template,scene);
      for(const width of [1440,390,320,768]) {
        await page.setViewportSize({width,height:width===390?844:900});
        await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});
        await page.mouse.move(0,0);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,scene+' '+template+' '+width+' overflow');
        const image=await page.locator('.gift-photo').boundingBox(), player=await page.locator('.gift-object,.turntable').boundingBox();
        assert.ok(image.x+image.width<player.x || image.y+image.height<player.y, 'Photo and '+scene+' do not overlap');
        assert.equal(await page.getByRole('heading',{level:1}).count(),1);
        assert.equal(await page.locator('audio').count(),1);
        assert.equal(await page.locator('.gift-note p').textContent(),'Every ordinary day with you is my favorite.');
        assert.equal(await page.locator('.gift-photo img').evaluate(i=>getComputedStyle(i).objectFit),'contain');
        if(width===1440||width===390) await page.locator('.gift-page').screenshot({path:`${root}/docs/qa/experience-${scene}-${template}-${width}.jpg`,quality:87});
      }
      checks.push(`${scene}/${template}: desktop/mobile/320/768; complete photo and exact note; one player; no overlap/overflow`);
      await sharp(`${root}/docs/qa/experience-${scene}-${template}-1440.jpg`).extract({left:0,top:0,width:1440,height:850}).resize(480,320,{fit:'cover'}).webp({quality:85}).toFile(`${root}/public/images/gift-template-${scene}-${template}.webp`);
      if(scene==='teddy') {
        await page.getByRole('button',{name:'Play song',exact:true}).click();
        await page.waitForFunction(()=>!document.querySelector('audio').paused && document.querySelector('audio').currentTime>.3);
        const transform=()=>page.locator('.teddy-arm').evaluate(e=>getComputedStyle(e).transform);
        const first=await transform(); await page.waitForTimeout(220); assert.notEqual(await transform(),first);
        await page.getByRole('button',{name:'Pause song',exact:true}).click();
        await page.waitForTimeout(80); const paused=await transform(); await page.waitForTimeout(200); assert.equal(await transform(),paused);
        await page.emulateMedia({reducedMotion:'reduce'});
        await page.getByRole('button',{name:'Play song',exact:true}).click();
        assert.equal(await page.locator('.teddy-arm').evaluate(e=>getComputedStyle(e).animationName),'none');
        await page.getByRole('button',{name:'Pause song',exact:true}).click();
        await page.emulateMedia({reducedMotion:'no-preference'});
        checks.push(`${template}: teddy bow changes during playback, stays fixed on pause, motion off preserves audio`);
      }
    }
  }
  // Verify the frequency response itself, not a decorative playing-state animation.
  for(const tone of ['bass','treble']) {
    await page.route('**/audio/*.mp3',r=>r.fulfill({status:200,contentType:'audio/wav',body:tones[tone]}));
    await seed('record','equalizer');
    await page.getByRole('button',{name:'Play song',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('audio').currentTime>.5);
    const levels=()=>page.locator('.eq-band').evaluateAll(bs=>bs.map(b=>Number(b.style.getPropertyValue('--level'))));
    const sample=await levels();
    assert.ok(Math.max(...sample)>.3, 'Analyser receives actual audio');
    if(tone==='bass') assert.ok(sample[2]>sample[7]+.25,JSON.stringify(sample));
    else assert.ok(sample[7]>sample[2]+.25,JSON.stringify(sample));
    await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});
    await page.locator('.gift-page').screenshot({path:`${root}/docs/qa/experience-equalizer-${tone}-playing.jpg`,quality:87});
    await page.getByRole('button',{name:'Pause song',exact:true}).click();
    await page.waitForFunction(()=>[...document.querySelectorAll('.eq-band')].every(b=>Number(b.style.getPropertyValue('--level'))===0));
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.getByRole('button',{name:'Play song',exact:true}).click();
    await page.waitForTimeout(200); await page.waitForFunction(()=>[...document.querySelectorAll('.eq-band')].every(b=>Number(b.style.getPropertyValue('--level'))===0));
    assert.equal(await page.locator('audio').evaluate(a=>a.paused),false);
    await page.getByRole('button',{name:'Pause song',exact:true}).click();
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.unroute('**/audio/*.mp3');
    checks.push(`Equalizer actual ${tone} tone: ${JSON.stringify(sample)}; pause/reduced motion stop display while audio remains usable`);
  }
  for(const scene of ['record','teddy','equalizer']) {
    await seed('record',scene,null,'');
    assert.equal(await page.locator('.gift-photo,.gift-note').count(),0);
    const tall=Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="800"><rect width="300" height="800" fill="#dac99f"/></svg>').toString('base64');
    await seed('letter',scene,tall,'A personal message with room to breathe. '.repeat(30).slice(0,600),'image/svg+xml');
    await page.setViewportSize({width:320,height:900});
    assert.equal(await page.locator('.gift-note p').textContent().then(s=>s.length),600);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    checks.push(scene+': no photo/note and 600-character note with tall image');
  }
  await seed('record','teddy');
  await page.goto(origin+'/studio-preview?step=prepare');
  await page.getByRole('heading',{name:'Personalize their gift.'}).waitFor();
  await page.getByRole('button',{name:'Equalizer',exact:true}).click();
  await page.getByRole('button',{name:'Letter',exact:true}).click();
  await page.reload();
  await page.getByRole('button',{name:'Equalizer',exact:true,pressed:true}).waitFor();
  await page.getByRole('button',{name:'Letter',exact:true,pressed:true}).waitFor();
  checks.push('Scene and presentation choices independently persist across reload');
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:width===390?844:900});
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:`${root}/docs/qa/experience-picker-${width}.jpg`,quality:85,fullPage:true});
  }
  assert.deepEqual(errors,[]);
  await fs.writeFile(root+'/docs/qa/gift-experiences-evidence.json',JSON.stringify({date:new Date().toISOString(),scope:'Production build with synthetic IndexedDB gift drafts; 9 combinations, real audio spectrum from controlled WAV tones and actual bear animation.',checks},null,2)+'\n');
  console.log(checks.join('\n'));
} catch(e) { console.error(logs); throw e; }
finally { await browser?.close(); server.kill(); }
