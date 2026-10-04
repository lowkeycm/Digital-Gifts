import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const qa=createRequire(path.join(process.env.STUDIO_QA_RUNTIME??path.join(root,'..','qa-runtime'),'package.json'));
const {chromium}=qa('playwright'), cm=qa('@sparticuz/chromium'), chrome=cm.default??cm;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-H','127.0.0.1','-p','3137'],{cwd:root,env:{...process.env,VERCEL_ENV:'preview'},stdio:['ignore','pipe','pipe']});
let logs='',browser;server.stdout.on('data',c=>logs+=c);server.stderr.on('data',c=>logs+=c);
const checks=[];
try {
  for(let n=0;n<100&&!logs.includes('Ready in');n++) await new Promise(r=>setTimeout(r,100));
  assert.ok(logs.includes('Ready in'));
  browser=await chromium.launch({executablePath:await chrome.executablePath(),args:chrome.args,headless:true});
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3137/studio-preview?step=prepare');
  await page.getByRole('button',{name:'Give this version',exact:true}).click();
  await page.getByRole('heading',{name:'Personalize their gift.'}).waitFor();
  const input=page.locator('#gift-preparation input[type=file]');
  for(const position of ['center','left edge','right edge']) {
    await input.scrollIntoViewIfNeeded();
    const b=await input.boundingBox();assert.ok(b.height>=44);
    const chosen=page.waitForEvent('filechooser');
    await page.touchscreen.tap(position==='left edge'?b.x+5:position==='right edge'?b.x+b.width-5:b.x+b.width/2,b.y+b.height/2);
    await (await chosen).setFiles(root+'/public/images/album-brother-to-sister.webp');
    await page.getByRole('button',{name:'Remove photo',exact:true}).waitFor();
    checks.push('390px touch '+position+': actual filechooser event, selected photo retained');
  }
  await page.getByLabel('A note from you (optional)').fill('A little music for our crew.');
  await page.getByRole('button',{name:'Teddy Bear',exact:true}).click();
  await page.getByRole('button',{name:'Card',exact:true}).click();
  await page.locator('#gift-preparation').screenshot({path:root+'/docs/qa/mobile-photo-picker.jpg',quality:88});
  await page.getByRole('button',{name:'Continue to sharing',exact:true}).click();
  await page.reload();
  await page.getByRole('button',{name:/Make it theirs/}).click();
  await page.getByRole('button',{name:'Remove photo',exact:true}).waitFor();
  await page.getByRole('button',{name:'Continue to sharing',exact:true}).click();
  await page.getByRole('link',{name:'Open their gift page',exact:true}).click();
  await page.locator('.teddy-key').waitFor();
  assert.equal(await page.locator('.gift-note p').innerText(),'A little music for our crew.');
  await page.locator('.gift-photo img').evaluate(i=>i.decode());
  const transform=()=>page.locator('.teddy-key').evaluate(e=>getComputedStyle(e).transform);
  for(const width of [390,1440]) {
    await page.setViewportSize({width,height:width===390?844:900});
    await page.getByRole('button',{name:'Play song',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('audio').currentTime>.3);
    const playing=await transform();await page.waitForTimeout(250);assert.notEqual(await transform(),playing);
    await page.evaluate(()=>document.activeElement?.blur());
    await page.locator('.gift-page').screenshot({path:root+`/docs/qa/teddy-windup-${width}.jpg`,quality:88});
    await page.getByRole('button',{name:'Pause song',exact:true}).click();
    await page.waitForTimeout(80);const paused=await transform();await page.waitForTimeout(180);assert.equal(await transform(),paused);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    checks.push(width+'px: key turns during actual playback, freezes on pause; photo and note retained; no overflow');
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.getByRole('button',{name:'Play song',exact:true}).click();
  assert.equal(await page.locator('.teddy-key').evaluate(e=>getComputedStyle(e).animationName),'none');
  assert.equal(await page.locator('audio').evaluate(a=>a.paused),false);
  checks.push('Reduced motion: key remains still while audio plays');
  assert.deepEqual(errors,[]);
  await fs.writeFile(root+'/docs/qa/mobile-picker-teddy-evidence.json',JSON.stringify({date:new Date().toISOString(),environment:'Chromium mobile touch emulation and desktop viewport. Physical Android/embedded app not available.',checks},null,2)+'\n');
  console.log(checks.join('\n'));
}catch(e){console.error(logs);throw e;}finally{await browser?.close();server.kill();}
