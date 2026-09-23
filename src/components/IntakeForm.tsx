"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  recipientName: string;
  relationship: string;
  occasion: string;
  genre: string;
  vocalPreference: string;
  howYouMet: string;
  favoriteMemory: string;
  smallDetails: string;
  hardMoment: string;
  whatYouWantToSay: string;
  mustInclude: string;
  email: string;
};

const initial: FormData = {
  recipientName: "",
  relationship: "",
  occasion: "Anniversary",
  genre: "R&B",
  vocalPreference: "No preference",
  howYouMet: "",
  favoriteMemory: "",
  smallDetails: "",
  hardMoment: "",
  whatYouWantToSay: "",
  mustInclude: "",
  email: "",
};

const steps = [
  { title: "Start with the basics", subtitle: "Who is this for, and what kind of song should it become?" },
  { title: "Give us the memories", subtitle: "Specific beats impressive. Write it the way you would tell a friend." },
  { title: "Give us the little stuff", subtitle: "Inside jokes and tiny habits are usually what make the song feel real." },
  { title: "What do you actually want to say?", subtitle: "Do not polish it. Say the thing you want them to feel." },
];

export function IntakeForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
  const set = (key: keyof FormData, value: string) => setData((current) => ({ ...current, [key]: value }));

  function validateStep() {
    if (step === 0 && (!data.recipientName.trim() || !data.relationship.trim())) return "Tell us who the song is for and your relationship.";
    if (step === 1 && (data.howYouMet.trim().length < 10 || data.favoriteMemory.trim().length < 10)) return "Give us a little more detail. Specific memories make the song better.";
    if (step === 2 && data.smallDetails.trim().length < 10) return "Give us at least one little detail that feels like the two of you.";
    return "";
  }

  function next() {
    const message = validateStep();
    if (message) return setError(message);
    setError("");
    setStep((current) => Math.min(steps.length - 1, current + 1));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (data.whatYouWantToSay.trim().length < 10 || !data.email.includes("@")) {
      setError("Tell us what you want them to feel and where to send the song.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/intakes", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not save your story.");
      router.push(`/preview/${body.id}?key=${body.accessToken}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="form-card">
      <div className="step-line"><span>Step {step + 1} of {steps.length}</span><span>{Math.round(progress)}%</span></div>
      <h1 className="form-title">{steps[step].title}</h1>
      <p className="lede form-lede">{steps[step].subtitle}</p>
      <div className="progress" aria-hidden="true"><div style={{ width: `${progress}%` }} /></div>

      {step === 0 && <>
        <div className="row"><div className="field"><label>Their name</label><input value={data.recipientName} onChange={(e) => set("recipientName", e.target.value)} placeholder="Ashley" /></div><div className="field"><label>Your relationship</label><input value={data.relationship} onChange={(e) => set("relationship", e.target.value)} placeholder="My wife" /></div></div>
        <div className="row"><div className="field"><label>Occasion</label><select value={data.occasion} onChange={(e) => set("occasion", e.target.value)}><option>Anniversary</option><option>Birthday</option><option>Wedding</option><option>Just because</option><option>Apology / reconnection</option><option>Other</option></select></div><div className="field"><label>Genre</label><select value={data.genre} onChange={(e) => set("genre", e.target.value)}><option>R&B</option><option>Country</option><option>Pop</option><option>Acoustic</option><option>Rock</option><option>Hip-hop / rap</option><option>Gospel</option><option>Other</option></select></div></div>
        <div className="field"><label>Vocal preference</label><select value={data.vocalPreference} onChange={(e) => set("vocalPreference", e.target.value)}><option>No preference</option><option>Male vocal</option><option>Female vocal</option></select></div>
      </>}

      {step === 1 && <>
        <div className="field"><label>How did you meet?</label><textarea value={data.howYouMet} onChange={(e) => set("howYouMet", e.target.value)} placeholder="Where were you? What happened? What did you think of them at first?" /><div className="help">“We met in college” gives the songwriter almost nothing. “We met at Howard and I thought she was stuck up at first...” gives it something real to work with.</div></div>
        <div className="field"><label>What memory would instantly make them smile?</label><textarea value={data.favoriteMemory} onChange={(e) => set("favoriteMemory", e.target.value)} placeholder="A trip, a terrible first date, getting lost somewhere, the night everything clicked..." /></div>
      </>}

      {step === 2 && <>
        <div className="field"><label>What are the little things that feel like the two of you?</label><textarea value={data.smallDetails} onChange={(e) => set("smallDetails", e.target.value)} placeholder="Inside jokes, things they always say, stealing your fries, a nickname, your Sunday routine..." /></div>
        <div className="field"><label>Was there a moment they really showed up for you? <span className="help">Optional</span></label><textarea value={data.hardMoment} onChange={(e) => set("hardMoment", e.target.value)} placeholder="What actually happened? Concrete details beat dramatic wording." /></div>
        <div className="field"><label>Anything that absolutely needs to make it into the song? <span className="help">Optional</span></label><textarea value={data.mustInclude} onChange={(e) => set("mustInclude", e.target.value)} placeholder="A date, place, phrase, name or memory..." /></div>
      </>}

      {step === 3 && <>
        <div className="field"><label>What do you want them to understand or feel when they hear it?</label><textarea value={data.whatYouWantToSay} onChange={(e) => set("whatYouWantToSay", e.target.value)} placeholder="Say it in your own words. This is not the place to sound poetic." /></div>
        <div className="field"><label>Your email</label><input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" /><div className="help">This will be used for delivery once email sending is connected.</div></div>
      </>}

      {error && <p className="error-copy">{error}</p>}
      <div className="form-actions">
        <button type="button" className="ghost" disabled={step === 0 || busy} onClick={() => { setError(""); setStep((current) => Math.max(0, current - 1)); }}>Back</button>
        {step < steps.length - 1 ? <button type="button" className="pill primary" onClick={next}>Continue</button> : <button className="pill primary" disabled={busy}>{busy ? "Building your preview..." : "Create my preview"}</button>}
      </div>
    </form>
  );
}
