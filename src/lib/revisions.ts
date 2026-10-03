import type { BetaJob } from "./beta-repository";
import type { Intake } from "./intake";
import { kieBrief, KIE_PROMPT_LIMIT } from "./music/kie";
import { INCLUDED_REVISIONS } from "./offer";

export function revisionHistory(jobs: BetaJob[], before = Infinity) {
  const rounds = new Map<number, BetaJob>();
  for (const job of jobs) {
    const round = job.revision_number ?? 1;
    if (job.kind === "revision" && job.status === "complete" && round < before)
      rounds.set(round, job);
  }
  return [...rounds.entries()].sort(([a], [b]) => a - b).map(([, job]) => job.notes);
}
export function revisionNotes(jobs: BetaJob[], notes: string, before = Infinity) {
  return [...revisionHistory(jobs, before), notes].filter(Boolean).join("\n");
}
export function latestMusicalNotes(notes: string[]) {
  return [...notes].reverse().find((note) => /^(Change the style|Make it more upbeat|Make it more emotional):/.test(note)) ?? "";
}
export function revisionNotesAllowance(input: Intake, jobs: BetaJob[], before = Infinity) {
  const history = revisionHistory(jobs, before);
  const remaining = Math.max(1, INCLUDED_REVISIONS - history.length);
  const header = history.length ? 1 : kieBrief(input, "x").length - kieBrief(input).length - 1;
  // Share the remaining provider budget so an early long edit cannot crowd out
  // the next included revision. Reserve the intervening newlines too.
  const available = KIE_PROMPT_LIMIT - kieBrief(input, history.join("\n")).length - header - (remaining - 1);
  return Math.max(0, Math.min(500, Math.floor(available / remaining)));
}
