import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module, { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const originalResolve = Module._resolveFilename, originalLoad = Module._load;
Module._resolveFilename = function(id, ...rest) {
  return originalResolve.call(this, id.startsWith('@/') ? path.join(root, 'src', id.slice(2)) : id, ...rest);
};
Module._load = function(id, ...rest) {
  if (id === 'server-only') return {};
  if (id === 'next/server') return {after() {}};
  return originalLoad.call(this, id, ...rest);
};
Module._extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true},
  }).outputText, filename);
};
const {intakeSchema} = require('../src/lib/intake.ts');
const {directionInput, translateDirection, DirectionError} = require('../src/lib/music/translate-direction.ts');
const {kieBrief, startKie} = require('../src/lib/music/kie.ts');
const {directionStyle} = require('../src/lib/music/direction.ts');
const input = intakeSchema.parse({recipientName:'QA only',relationship:'My wife',occasion:'Anniversary',genre:'Acoustic',vocalPreference:'Male vocal',howYouMet:'We met on Maple Street, you said “move your car.”',favoriteMemory:'The road trip and the GPS pep talk.  Exactly two spaces.',smallDetails:'You steal my fries and leave one.',whatYouWantToSay:'I love the ordinary days together.',email:'qa@example.com',musicPreferences:{description:'Chill acoustic coffeehouse',vocals:'Warm and a little raspy',energy:'Slow and relaxed',instruments:'Fingerpicked guitar and soft percussion',inspiration:'90s folk',avoid:'No heavy drums'}});
const originalInput = JSON.stringify(input);
const direction = {genre:'Acoustic folk',vocals:'Warm, lightly raspy male vocal',instruments:['Fingerpicked acoustic guitar','Soft percussion'],tempo:'Relaxed 75-85 BPM',mood:'Intimate and warm',production:'Natural acoustic production',arrangement:'Short intro, early chorus, singable verses, bridge, complete ending',negativeTags:['Heavy drums']};
let calls = [], behavior = 'ok', musicBehavior = 'ok';
process.env.KIE_API_KEY = 'synthetic-only';
globalThis.fetch = async (url, options) => {
  const body = JSON.parse(options.body); calls.push({url:String(url),body});
  if (String(url).includes('/chat/completions')) {
    assert.equal(options.cache,'no-store'); assert.ok(options.signal); assert.equal(body.stream,false); assert.equal(body.tools,undefined);
    const preferences = JSON.parse(body.messages[1].content);
    for(const key of ['recipientName','email','howYouMet','favoriteMemory','smallDetails','hardMoment','whatYouWantToSay','mustInclude']) assert.equal(preferences[key],undefined);
    if (behavior === 'timeout') throw new DOMException('Synthetic timeout','TimeoutError');
    if (behavior === 'unauthorized') return new Response('{}',{status:401});
    const content = behavior === 'bad-json' ? 'not JSON' : behavior === 'too-long' ? JSON.stringify({...direction,genre:'x'.repeat(101)}) : JSON.stringify(direction);
    if (behavior === 'choices') return Response.json({choices:[{message:{content:'```json\n'+content+'\n```'},finish_reason:'stop'}],usage:{prompt_tokens:100,completion_tokens:75,total_tokens:175},credits_consumed:0.02});
    return Response.json({candidates:[{content:{parts:[{thought:true,text:'discard internal thought'},{text:content}]},finishReason:'STOP'}],usageMetadata:{promptTokenCount:100,candidatesTokenCount:75,totalTokenCount:175},credits_consumed:0.02});
  }
  if (musicBehavior === 'timeout') throw new DOMException('Synthetic timeout','TimeoutError');
  if (musicBehavior === 'reject') return Response.json({code:422},{status:422});
  return Response.json({code:200,data:{taskId:'synthetic-task'}});
};
const checks=[];
function pass(name) { checks.push(name); console.log('PASS',name); }
assert.equal(directionInput({...input,musicPreferences:undefined}),null);
assert.equal(directionInput({...input,musicPreferences:{...input.musicPreferences,description:' ',vocals:'',energy:'',instruments:'',inspiration:'',avoid:''}}),null);
assert.equal(intakeSchema.safeParse({...input,musicPreferences:{description:'x'.repeat(401)}}).success,false);
pass('Old intake compatibility, blank preferences bypass, server input bounds');
const translated = await translateDirection(directionInput(input),'generation-id');
assert.deepEqual(translated.direction,direction); assert.equal(translated.usage.totalTokens,175);
assert.equal(JSON.stringify(input),originalInput);
await startKie(input,'https://example.com/callback',undefined,translated.direction);
const music = calls.at(-1).body.input;
assert.equal(music.custom_mode,false); assert.equal(music.model,'V6'); assert.equal(music.style,directionStyle(direction)); assert.equal(music.negative_tags,'Heavy drums'); assert.equal(music.prompt,kieBrief(input));
assert.ok(music.prompt.includes(input.favoriteMemory)); assert.ok(!music.prompt.includes('Chill acoustic coffeehouse')); assert.ok(music.style.length<=1000);
assert.equal(music.vocal_gender,undefined); pass('Real provider payload construction: separate style/exclusions, exact raw story, V6 non-custom');
behavior='choices'; assert.deepEqual((await translateDirection(directionInput(input),'alternate-response')).direction,direction); pass('OpenAI and Gemini response envelopes, fenced JSON and thought filtering');
for (behavior of ['bad-json','too-long','timeout','unauthorized']) await assert.rejects(()=>translateDirection(directionInput(input),'failure-id'),DirectionError);
pass('Malformed, overlength, timeout and authentication failures rejected'); behavior='ok';
assert.equal(directionInput(input,'Fix a detail: We met in 2017.').musicalRevision,undefined);
assert.equal(directionInput(input,'Change the style: Make it gospel.').musicalRevision,'Change the style: Make it gospel.');
pass('Only musical revision categories enter translation, factual notes stay raw');

// Exercise the real reservation orchestration against an atomic in-memory repository.
let jobs=[], nextId=0, failSave=false;
const repo = {
  db:()=>({
    rpc:async (_name,p)=>{
      let latest=jobs.filter(j=>j.kind===p.p_kind).at(-1);
      if (!latest || (latest.status==='failed' && p.p_retry)) {
        latest={id:String(++nextId),session_id:p.p_session_id,kind:p.p_kind,notes:latest?.notes??p.p_notes,status:'submitting',task_id:null,callback_token:'synthetic-callback'};
        jobs.push(latest);
      }
      return {data:[structuredClone(latest)],error:null};
    },
    from:()=>{
      const filters=[]; let values;
      const query={update(v){values=v;return this},eq(k,v){filters.push(j=>j[k]===v);return this},is(k,v){filters.push(j=>j[k]===v);return this},select(){return this},then(resolve){
        const rows=jobs.filter(j=>filters.every(f=>f(j))); rows.forEach(j=>Object.assign(j,values)); return Promise.resolve({data:rows.map(j=>({id:j.id})),error:null}).then(resolve);
      }}; return query;
    },
  }),
  jobsFor:async()=>structuredClone(jobs),
  updateJob:async(id,values)=>{if(failSave)throw new Error('synthetic-save-failure');Object.assign(jobs.find(j=>j.id===id),values)},
};
const repoPath=require.resolve('../src/lib/beta-repository.ts');
require.cache[repoPath]={id:repoPath,filename:repoPath,loaded:true,exports:repo};
const {reserveAndStart}=require('../src/lib/beta-generation.ts');
const session={id:'synthetic-session',raw_answers:input};
calls=[]; await Promise.all([reserveAndStart(session,'original','https://example.com'),reserveAndStart(session,'original','https://example.com')]);
assert.equal(calls.filter(c=>c.url.includes('/chat/')).length,1); assert.equal(calls.filter(c=>c.url.includes('/jobs/createTask')).length,1); assert.equal(jobs[0].status,'queued'); assert.ok(jobs[0].music_direction); pass('Concurrent reservation replay spends one translation and one music request');
await reserveAndStart(session,'revision','https://example.com','Fix a detail: Maple Road, not Maple Street.');
assert.equal(calls.filter(c=>c.url.includes('/chat/')).length,1); assert.equal(calls.at(-1).body.input.style,directionStyle(direction)); assert.ok(calls.at(-1).body.input.prompt.includes('Maple Road, not Maple Street.')); pass('Factual revision reuses saved sound and passes raw correction');
await reserveAndStart(session,'revision','https://example.com'); assert.equal(calls.length,3); pass('Revision replay is idempotent');
jobs=[]; calls=[]; behavior='bad-json'; await reserveAndStart(session,'original','https://example.com');
assert.equal(jobs[0].status,'failed'); assert.equal(jobs[0].error_code,'style_translation_failed'); assert.equal(calls.length,1); behavior='ok';
await reserveAndStart(session,'original','https://example.com','',true); assert.equal(jobs[1].status,'queued'); pass('Translation failure spends no music credits, preferences preserved for safe retry');
jobs=[]; calls=[]; musicBehavior='reject'; await reserveAndStart(session,'original','https://example.com'); assert.equal(jobs[0].status,'failed'); musicBehavior='ok'; await reserveAndStart(session,'original','https://example.com','',true); assert.equal(calls.filter(c=>c.url.includes('/chat/')).length,1); assert.equal(jobs[1].status,'queued'); pass('Definitive provider rejection retries using saved translation');
jobs=[]; calls=[]; musicBehavior='timeout'; await reserveAndStart(session,'original','https://example.com'); assert.equal(jobs[0].status,'uncertain'); await reserveAndStart(session,'original','https://example.com','',true); assert.equal(calls.length,2); pass('Music timeout never blindly resubmits'); musicBehavior='ok';
jobs=[]; calls=[]; failSave=true; await reserveAndStart(session,'original','https://example.com'); failSave=false; assert.equal(jobs[0].status,'failed'); assert.equal(calls.length,1); pass('Music submission waits for durable translation save');
jobs=[]; calls=[]; await reserveAndStart({...session,raw_answers:{...input,musicPreferences:undefined}},'original','https://example.com'); assert.equal(calls.length,1); assert.ok(calls[0].url.includes('/jobs/createTask')); pass('Basic path keeps existing sound and needs no LLM');
jobs=[]; calls=[]; await reserveAndStart(session,'original','https://example.com'); await reserveAndStart(session,'revision','https://example.com','Change the style: Make it gospel.'); assert.equal(calls.filter(c=>c.url.includes('/chat/')).length,2); pass('Musical revisions produce new translated direction');
assert.equal(JSON.stringify(input),originalInput); pass('Customer source objects never mutated');
if(process.argv.includes('--record')) fs.writeFileSync(path.join(root,'docs/qa/music-direction-checks.json'),JSON.stringify({environment:'Real TypeScript modules, controlled in-memory reservation repository and provider transport; no network or paid generations.',checks},null,2)+'\n');
