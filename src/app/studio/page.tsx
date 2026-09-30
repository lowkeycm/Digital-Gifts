import type { Metadata } from "next";
import Link from "next/link";
import { GiftBrand } from "@/components/GiftBrand";
import { StudioControls } from "@/components/StudioControls";
import { isStudioOwner, studioConfigured } from "@/lib/studio-auth";
import { betaReady } from "@/lib/beta-config";
import {
  db,
  dailyJobCount,
  type BetaSession,
  type BetaJob,
} from "@/lib/beta-repository";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Test studio | The Gift Smith",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default async function StudioPage() {
  const owner = await isStudioOwner();
  if (!owner)
    return (
      <main id="main-content" className="shell section delivery-shell">
        <GiftBrand />
        <h1>Test studio</h1>
        {studioConfigured() ? (
          <StudioControls />
        ) : (
          <p>
            Add a TEST_STUDIO_PASSWORD of at least 16 characters in this
            project’s server environment to enable the private owner dashboard.
          </p>
        )}
      </main>
    );
  if (!betaReady())
    return (
      <main id="main-content" className="shell section">
        <h1>Finish connecting the studio</h1>
        <p>The Kie and private storage server credentials are required.</p>
        <StudioControls action="logout" />
      </main>
    );
  const [sessions, jobs, feedback] = await Promise.all([
    db()
      .from("song_beta_sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
    db()
      .from("song_beta_jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(600),
    db()
      .from("song_beta_feedback")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(100),
  ]);
  if (sessions.error || jobs.error || feedback.error)
    throw new Error("studio_read_failed");
  const dailyJobs = await dailyJobCount();
  return (
    <main id="main-content" className="shell section">
      <GiftBrand />
      <div className="delivery-heading">
        <h1>Test studio</h1>
        <StudioControls action="logout" />
      </div>
      <p>
        {dailyJobs} generation reservations in the last 24 hours / 100 maximum.
        No payment is collected.
      </p>
      <p>
        Private links below manage each test song. Reaction videos are for
        review only; ask the tester before publishing.
      </p>
      <div className="studio-tracks">
        {(sessions.data as BetaSession[]).map((s) => {
          const f = feedback.data?.find((f) => f.session_id === s.id);
          return (
            <article className="card" key={s.id}>
              <h2>{s.raw_answers.recipientName}</h2>
              <p>
                {s.raw_answers.email} ·{" "}
                {new Date(s.created_at).toLocaleDateString("en-US")}
              </p>
              <Link
                className="pill"
                href={`/song/${s.id}?key=${s.access_token}`}
              >
                Open private song page
              </Link>
              {(jobs.data as BetaJob[])
                .filter((j) => j.session_id === s.id)
                .map((j) => (
                  <div key={j.id} className="studio-job">
                    <p>
                      {j.kind}: <strong>{j.status}</strong>
                      {j.error_code ? ` / ${j.error_code}` : ""}
                    </p>
                    <p className="help">
                      Provider task: {j.task_id ?? "Not confirmed"}
                    </p>
                    {!["complete", "failed"].includes(j.status) && (
                      <StudioControls action="sync" jobId={j.id} />
                    )}
                  </div>
                ))}
              {s.reaction_asset_id && (
                <section className="studio-reaction">
                  <h3>Uploaded reaction</h3>
                  <video
                    className="reaction-preview"
                    controls
                    preload="metadata"
                    src={`/api/songs/${s.id}/media?asset=${s.reaction_asset_id}&studio=1`}
                  />
                  <a
                    className="pill"
                    href={`/api/songs/${s.id}/media?asset=${s.reaction_asset_id}&studio=1&download=1`}
                  >
                    Download original video
                  </a>
                  <p className="help">
                    Private review only. Ask before publishing.
                  </p>
                </section>
              )}
              {f && (
                <div>
                  <h3>Feedback: {f.rating} / 5</h3>
                  <p>{f.comments || "No written feedback."}</p>
                  {f.reaction_url && (
                    <a href={f.reaction_url} target="_blank" rel="noreferrer">
                      View reaction video
                    </a>
                  )}
                  <p className="help">
                    Permission to contact about sharing:{" "}
                    {f.may_contact ? "Yes" : "No"}. Publication permission has
                    not been collected.
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
      {!sessions.data?.length && <p>No test songs yet.</p>}
    </main>
  );
}
