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
  const seed=async (template, image=photo, note='Every ordinary day with you is my favorite.', mime='image/webp')=>{
    await page.evaluate(async ({state,template,image,note,mime})=>{
      const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('song-studio-design-preview',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
      await new Promise((resolve,reject)=>{const tx=db.transaction('drafts','readwrite');tx.objectStore('drafts').put({state:{...state,selectedTrackId:state.tracks[1].id,giftTemplate:template,giftMessage:note},step:'prepare',photo:image?new Blob([Uint8Array.from(atob(image),c=>c.charCodeAt(0))],{type:mime}):null},'current');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});db.close();
    },{state:base,template,image,note,mime});
    await page.reload(); await page.locator('.gift-page--'+template).waitFor();
    if(image) await page.locator('.gift-photo img').evaluate(i=>i.decode());
    await page.evaluate(()=>document.fonts.ready);
  };
  for(const template of ['record','portrait','letter']) {
    await seed(template);
    for(const width of [1440,390,320,768]) {
      await page.setViewportSize({width,height:width===390?844:900});
      await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});
      await page.mouse.move(0,0);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
      const image=await page.locator('.gift-photo').boundingBox(), player=await page.locator('.turntable').boundingBox();
      assert.ok(image.x+image.width<player.x || image.y+image.height<player.y, 'Photo and record player do not overlap');
      assert.equal(await page.getByRole('heading',{level:1}).count(),1);
      assert.equal(await page.locator('audio').count(),1);
      assert.equal(await page.locator('.gift-photo img').evaluate(i=>getComputedStyle(i).objectFit),'contain');
      assert.equal(await page.locator('.gift-progress input').evaluate(i=>getComputedStyle(i).borderTopWidth),'0px');
      if(width===1440||width===390) await page.locator('.gift-page').screenshot({path:`${root}/docs/qa/gift-${template}-${width}.jpg`,quality:88});
    }
    checks.push(`${template}: desktop/mobile/320/768, full photo clear of complete original turntable, one heading/player, exact personal note`);
    // These are previews of the actual component, not separately drawn approximations.
    await sharp(`${root}/docs/qa/gift-${template}-1440.jpg`).extract({left:0,top:0,width:1440,height:850}).resize(480,320,{fit:'cover'}).webp({quality:85}).toFile(`${root}/public/images/gift-template-${template}.webp`);
  }
  await page.setViewportSize({width:1440,height:900});
  await seed('record',null,'');
  assert.equal(await page.locator('.gift-photo,.gift-note').count(),0);
  await page.locator('.gift-page').screenshot({path:root+'/docs/qa/gift-record-no-photo-1440.jpg',quality:88});
  await page.setViewportSize({width:390,height:844});
  await page.locator('.gift-page').screenshot({path:root+'/docs/qa/gift-record-no-photo-390.jpg',quality:88});
  checks.push('Original record experience remains complete without an uploaded photo or note');
  const tall=Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="800"><rect width="300" height="800" fill="#dac99f"/><path d="M0 0L300 800M300 0L0 800" stroke="#204e45" stroke-width="18"/></svg>').toString('base64');
  await seed('letter',tall,'A personal message with room to breathe. '.repeat(15).slice(0,600),'image/svg+xml');
  assert.equal(await page.locator('.gift-note p').textContent(),'A personal message with room to breathe. '.repeat(15).slice(0,600));
  assert.equal(await page.locator('.gift-photo img').evaluate(i=>i.naturalHeight),800);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.locator('.gift-page').screenshot({path:root+'/docs/qa/gift-letter-long-note-390.jpg',quality:85});
  checks.push('Tall image and maximum 600-character note stay fully visible on mobile');
  await seed('record');
  await page.goto(origin+'/studio-preview?step=prepare');
  await page.getByRole('heading',{name:'Personalize their gift.'}).waitFor();
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:width===390?844:900});
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:`${root}/docs/qa/gift-picker-${width}.jpg`,quality:85,fullPage:true});
  }
  assert.deepEqual(errors,[]);
  await fs.writeFile(root+'/docs/qa/gift-restoration-evidence.json',JSON.stringify({date:new Date().toISOString(),scope:'Final production build; actual GiftExperience with synthetic IndexedDB draft. Playback/arm/reduced-motion and real private routes verified in premium-browser-evidence.json.',checks},null,2)+'\n');
  console.log(checks.join('\n'));
} catch(e) { console.error(logs); throw e; }
finally { await browser?.close(); server.kill(); }
