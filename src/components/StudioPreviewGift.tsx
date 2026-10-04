"use client";
import Link from "next/link";
import { useStudioPreviewDraft } from "./StudioPreviewDraft";
import { GiftExperience } from "./GiftExperience";
export function StudioPreviewGift() {
  const preview = useStudioPreviewDraft();
  if (!preview?.ready)
    return (
      <p className="studio-loading" role="status">
        Opening your gift...
      </p>
    );
  const state = preview.draft.state;
  const track =
    state.tracks.find((t) => t.id === state.selectedTrackId) ?? state.tracks[0];
  return (
    <>
      <div className="studio-demo-notice">
        Gift preview.{" "}
        <Link href="/studio-preview?step=share">Back to studio</Link>
      </div>
      <GiftExperience
        recipient={state.recipientName}
        occasion={state.occasion}
        title={track.title}
        lyrics={track.lyrics}
        audioUrl={
          state.tracks.indexOf(track) % 2
            ? "/audio/traci-my-rock.mp3"
            : "/audio/the-way-i-see-you.mp3"
        }
        photoUrl={preview.photoUrl}
        message={state.giftMessage}
        template={state.giftTemplate}
      />
    </>
  );
}
