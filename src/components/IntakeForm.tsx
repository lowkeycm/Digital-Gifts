"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { kieBrief } from "@/lib/music/kie";
import { SoundPreferences } from "./SoundPreferences";
import type { MusicPreferences } from "@/lib/intake";

type FormData = {
  recipientName: string;
  relationship: string;
  occasion: string;
  genre: string;
  vocalPreference: string;
  musicPreferences: MusicPreferences;
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
  musicPreferences: { description: "", mood: "", energy: "", vocals: "", instruments: "", inspiration: "", avoid: "" },
  howYouMet: "",
  favoriteMemory: "",
  smallDetails: "",
  hardMoment: "",
  whatYouWantToSay: "",
  mustInclude: "",
  email: "",
};

const steps = [
  {
    title: "Start with the basics",
    subtitle: "Who is this for, and what kind of song should it become?",
  },
  {
    title: "Give us the memories",
    subtitle:
      "Specific beats impressive. Write it the way you would tell a friend.",
  },
  {
    title: "Give us the little stuff",
    subtitle:
      "Inside jokes and tiny habits are usually what make the song feel real.",
  },
  {
    title: "What do you actually want to say?",
    subtitle: "Do not polish it. Say the thing you want them to feel.",
  },
];

export function IntakeForm({ ready = true, checkoutMode = "free" }: { ready?: boolean; checkoutMode?: "free" | "test" | "live" }) {
  const router = useRouter();
  const [requestId] = useState(() => crypto.randomUUID());
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const storyLength = kieBrief(data).length;
  const overBudget = storyLength > 2400;
  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
  const set = (key: Exclude<keyof FormData, "musicPreferences">, value: string) =>
    setData((current) => ({ ...current, [key]: value }));
  const setSound = (key: keyof MusicPreferences, value: string) =>
    setData((current) => ({ ...current, musicPreferences: { ...current.musicPreferences, [key]: value } }));

  function validateStep() {
    if (step === 0 && (!data.recipientName.trim() || !data.relationship.trim()))
      return "Tell us who the song is for and your relationship.";
    if (
      step === 1 &&
      (data.howYouMet.trim().length < 10 ||
        data.favoriteMemory.trim().length < 10)
    )
      return "Give us a little more detail. Specific memories make the song better.";
    if (step === 2 && data.smallDetails.trim().length < 10)
      return "Give us at least one little detail that feels like the two of you.";
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
    if (step < steps.length - 1) {
      next();
      return;
    }
    if (data.whatYouWantToSay.trim().length < 10 || !data.email.includes("@")) {
      setError("Tell us what you want them to feel and your email.");
      return;
    }
    if (!consent || overBudget) {
      setError(
        overBudget
          ? "Please shorten a few answers to continue."
          : "Please agree to the song creation notice.",
      );
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/intakes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, requestId, consent, website, ...(checkoutMode === "test" ? { checkoutTest: true } : {}) }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not save your story.");
      router.push(`/song/${body.id}?key=${body.accessToken}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="form-card">
      <div className="step-line">
        <span>
          Step {step + 1} of {steps.length}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <h1 className="form-title">{steps[step].title}</h1>
      <p className="lede form-lede">{steps[step].subtitle}</p>
      <div className="progress" aria-hidden="true">
        <div style={{ width: `${progress}%` }} />
      </div>

      {step === 0 && (
        <>
          <div className="row">
            <div className="field">
              <label htmlFor="recipientName">Their name</label>
              <input
                maxLength={80}
                id="recipientName"
                name="recipientName"
                value={data.recipientName}
                onChange={(e) => set("recipientName", e.target.value)}
                placeholder="Ashley"
              />
            </div>
            <div className="field">
              <label htmlFor="relationship">Your relationship</label>
              <input
                maxLength={80}
                id="relationship"
                name="relationship"
                value={data.relationship}
                onChange={(e) => set("relationship", e.target.value)}
                placeholder="My wife"
              />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="occasion">Occasion</label>
              <select
                id="occasion"
                name="occasion"
                value={data.occasion}
                onChange={(e) => set("occasion", e.target.value)}
              >
                <option>Anniversary</option>
                <option>Birthday</option>
                <option>Wedding</option>
                <option>Just because</option>
                <option>Apology / reconnection</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="genre">Genre</label>
              <select
                id="genre"
                name="genre"
                value={data.genre}
                onChange={(e) => set("genre", e.target.value)}
              >
                <option>R&B</option>
                <option>Country</option>
                <option>Pop</option>
                <option>Acoustic</option>
                <option>Rock</option>
                <option>Hip-hop / rap</option>
                <option>Gospel</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="vocalPreference">Vocal preference</label>
            <select
              id="vocalPreference"
              name="vocalPreference"
              value={data.vocalPreference}
              onChange={(e) => set("vocalPreference", e.target.value)}
            >
              <option>No preference</option>
              <option>Male vocal</option>
              <option>Female vocal</option>
              <option>Duet</option>
            </select>
          </div>
          <SoundPreferences value={data.musicPreferences} onChange={setSound} />
        </>
      )}

      {step === 1 && (
        <>
          <div className="field">
            <label htmlFor="howYouMet">
              How did your story together begin?
            </label>
            <textarea
              maxLength={1800}
              id="howYouMet"
              name="howYouMet"
              value={data.howYouMet}
              onChange={(e) => set("howYouMet", e.target.value)}
              placeholder="How you met, growing up together, or an early memory that says something about your relationship."
            />
            <div className="help">
              “We met in college” gives the songwriter almost nothing. “We met
              at Howard and I thought she was stuck up at first...” gives it
              something real to work with.
            </div>
          </div>
          <div className="field">
            <label htmlFor="favoriteMemory">
              What memory would instantly make them smile?
            </label>
            <textarea
              maxLength={1800}
              id="favoriteMemory"
              name="favoriteMemory"
              value={data.favoriteMemory}
              onChange={(e) => set("favoriteMemory", e.target.value)}
              placeholder="A trip, a terrible first date, getting lost somewhere, the night everything clicked..."
            />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="field">
            <label htmlFor="smallDetails">
              What are the little things that feel like the two of you?
            </label>
            <textarea
              maxLength={1800}
              id="smallDetails"
              name="smallDetails"
              value={data.smallDetails}
              onChange={(e) => set("smallDetails", e.target.value)}
              placeholder="Inside jokes, things they always say, stealing your fries, a nickname, your Sunday routine..."
            />
          </div>
          <div className="field">
            <label htmlFor="hardMoment">
              Was there a moment they really showed up for you?{" "}
              <span className="help">Optional</span>
            </label>
            <textarea
              maxLength={1800}
              id="hardMoment"
              name="hardMoment"
              value={data.hardMoment}
              onChange={(e) => set("hardMoment", e.target.value)}
              placeholder="What actually happened? Concrete details beat dramatic wording."
            />
          </div>
          <div className="field">
            <label htmlFor="mustInclude">
              Anything that absolutely needs to make it into the song?{" "}
              <span className="help">Optional</span>
            </label>
            <textarea
              maxLength={800}
              id="mustInclude"
              name="mustInclude"
              value={data.mustInclude}
              onChange={(e) => set("mustInclude", e.target.value)}
              placeholder="A date, place, phrase, name or memory..."
            />
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {checkoutMode !== "free" && <div className="aside-note"><strong>$29 · Full song + three revisions</strong><p>Next, complete secure checkout. We’ll start your song after payment is confirmed.{checkoutMode === "test" ? " This private checkout uses Stripe test mode. No real payment is collected; music generation still uses Kie credits." : ""}</p></div>}
          <div className="field">
            <label htmlFor="whatYouWantToSay">
              What do you want them to understand or feel when they hear it?
            </label>
            <textarea
              maxLength={1800}
              id="whatYouWantToSay"
              name="whatYouWantToSay"
              value={data.whatYouWantToSay}
              onChange={(e) => set("whatYouWantToSay", e.target.value)}
              placeholder="Say it in your own words. This is not the place to sound poetic."
            />
          </div>
          <div className="field">
            <label htmlFor="email">Your email</label>
            <input
              id="email"
              name="email"
              autoComplete="email"
              type="email"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@example.com"
            />
            <div className="help">
              Keep your private song link so you can return to your versions and
              gift page.
            </div>
          </div>
        </>
      )}

      {overBudget && (
        <p role="alert" className="error-copy">
          Your story is {(storyLength - 2400).toLocaleString()} characters over
          the limit. Shorten a few answers to continue.
        </p>
      )}
      {step === 3 && (
        <>
          <label className="beta-consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />{" "}
            <span>
              I understand my story and sound preferences are sent to Kie’s AI
              services to create my song. I have permission to share these
              details.
            </span>
          </label>
          <div className="beta-honeypot" aria-hidden="true">
            <label>
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </div>
        </>
      )}
      {!ready && (
        <p className="help">
          Song creation is temporarily unavailable. Please keep your story and
          try again shortly.
        </p>
      )}
      {error && (
        <p role="alert" className="error-copy">
          {error}
        </p>
      )}
      <div className="form-actions">
        <button
          type="button"
          className="ghost"
          disabled={step === 0 || busy}
          onClick={() => {
            setError("");
            setStep((current) => Math.max(0, current - 1));
          }}
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button key="continue" type="submit" className="pill primary">
            Continue
          </button>
        ) : (
          <button
            key="submit"
            type="submit"
            className="pill primary"
            disabled={busy || !ready || overBudget || !consent}
          >
            {busy ? "Saving your story..." : checkoutMode === "free" ? "Create my song" : "Continue to checkout"}
          </button>
        )}
      </div>
    </form>
  );
}
