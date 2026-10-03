"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "login" | "signup" | "recover" | "password";
export function StudioSignIn({ initialMode = "login", expired = false }: { initialMode?: Mode; expired?: boolean }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(expired ? "That link expired or was opened in another browser. Request a new link below." : "");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const choosing = mode === "signup" || mode === "password";
  const label = mode === "recover" ? "Send reset link" : mode === "signup" ? "Create my account" : mode === "password" ? "Save password" : "Sign in";
  function changeMode(value: Mode) { setMode(value); setError(""); setMessage(""); setPassword(""); setConfirm(""); }
  return <>
    {message ? <div>
      <h2>Check your email</h2>
      <p role="status">{message}</p>
      <p>{email}</p>
    </div> : <>
    {mode === "recover" && <h2>Reset your password</h2>}
    {mode === "signup" && <h2>Set up your owner account</h2>}
    <form onSubmit={async event => {
      event.preventDefault(); setError(""); setMessage("");
      if (choosing && password !== confirm) { setError("The passwords do not match."); return; }
      setBusy(true);
      try {
        const response = await fetch("/api/studio", { method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ action: mode, ...(mode !== "password" ? { email } : {}), ...(mode !== "recover" ? { password } : {}) }) });
        const body = await response.json();
        if (!response.ok) throw new Error(body.error ?? "Please try again.");
        if (body.message) { setMessage(body.message); setPassword(""); setConfirm(""); }
        else { router.replace("/studio"); router.refresh(); }
      } catch (error) { setError(error instanceof Error ? error.message : "Please try again."); }
      finally { setBusy(false); }
    }}>
      {mode !== "password" && <div className="field"><label htmlFor="studio-email">Email</label>
        <input id="studio-email" type="email" autoComplete="username" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} />
      </div>}
      {mode !== "recover" && <div className="field"><label htmlFor="studio-password">{choosing ? "New password" : "Password"}</label>
        <input id="studio-password" type="password" autoComplete={choosing ? "new-password" : "current-password"} required minLength={choosing ? 12 : undefined} maxLength={200} value={password} onChange={e => setPassword(e.target.value)} aria-describedby={choosing ? "studio-password-help" : undefined} />
        {choosing && <p className="help" id="studio-password-help">Use at least 12 characters.</p>}
      </div>}
      {choosing && <div className="field"><label htmlFor="studio-confirm">Confirm password</label>
        <input id="studio-confirm" type="password" autoComplete="new-password" required value={confirm} onChange={e => setConfirm(e.target.value)} maxLength={200} />
      </div>}
      {error && <p role="alert" className="error-copy">{error}</p>}
      <button className="pill primary" disabled={busy}>{busy ? "Working..." : label}</button>
    </form>
    </>}
    {mode === "login" && <div className="studio-login-actions">
      <button type="button" disabled={busy} className="studio-text-button" onClick={() => changeMode("recover")}>Forgot password?</button>
      <button type="button" disabled={busy} className="studio-text-button" onClick={() => changeMode("signup")}>Set up my account</button>
    </div>}
    {(mode === "signup" || mode === "recover") && <button type="button" disabled={busy} className="studio-text-button" onClick={() => changeMode("login")}>Back to sign in</button>}
  </>;
}
