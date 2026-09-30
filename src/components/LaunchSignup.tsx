"use client";

import { useState } from "react";
import { Arrow } from "./GiftBrand";

export function LaunchSignup({ source }: { source: "/" | "/your-song" }) {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState("");

  return (
    <section id="launch" className="launch-section" aria-labelledby="launch-heading">
      <div className="shell launch-grid">
        <div>
          <span className="eyebrow light">Keep in touch</span>
          <h2 id="launch-heading">Here for<br /><em>the launch?</em></h2>
          <p>You can try Your Song for free now. Leave your email if you’d also like the official launch announcement.</p>
        </div>
        <div className="launch-form-wrap">
          {status === "success" ? (
            <div className="launch-success" role="status">
              <span className="eyebrow light">You’re on the list</span>
              <h3>We’ll be in touch.</h3>
              <p>Your email is saved for the launch announcement. In the meantime, think of a detail only they would recognize.</p>
              <a className="quiet-link" href="#samples">Hear another sample <span aria-hidden="true">↑</span></a>
            </div>
          ) : (
            <form onSubmit={async (event) => {
              event.preventDefault();
              if (status === "saving") return;
              const values = new FormData(event.currentTarget);
              setStatus("saving");
              setError("");
              try {
                const response = await fetch("/api/launch-signups", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: values.get("email"), website: values.get("website"), consent: true, source }),
                  signal: AbortSignal.timeout(15000),
                });
                if (!response.ok) throw new Error(response.status === 429 ? "We’re getting a lot of requests. Please try again in a little while." : "Your email wasn’t saved. Please try again.");
                setStatus("success");
              } catch (failure) {
                setError(failure instanceof Error && failure.name !== "TimeoutError" ? failure.message : "We couldn’t connect. Please try again.");
                setStatus("error");
              }
            }}>
              <label htmlFor="launch-email">Your email</label>
              <input id="launch-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} aria-describedby="launch-consent launch-error" />
              <div className="signup-trap" aria-hidden="true">
                <label htmlFor="launch-website">Leave this empty</label>
                <input id="launch-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <p id="launch-consent" className="launch-consent">By signing up, you agree to receive an email from The Gift Smith when Your Song launches. This signup is only for that announcement.</p>
              <button className="gift-button cream-button" type="submit" disabled={status === "saving"}>
                {status === "saving" ? "Saving your email…" : "Get notified at launch"}<Arrow />
              </button>
              <p id="launch-error" className="launch-error" role="alert">{error}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
