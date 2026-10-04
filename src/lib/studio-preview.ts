import type { StudioState } from "@/components/SongStudio";
export const studioPreview: StudioState = {
  recipientName: "Jennifer",
  genre: "Acoustic",
  occasion: "Anniversary",
  giftToken: null,
  selectedTrackId: null,
  giftPhotoId: null,
  reactionAssetId: null,
  feedbackSaved: false,
  giftMessage: "",
  giftGivenAt: null,
  giftSharedAt: null,
  giftTemplate: "record",
  emailEnabled: false,
  keepsake: { available: true, paid: false },
  checkout: { mode: "test", status: "paid", previewReady: true },
  jobs: [
    {
      id: "preview-original",
      kind: "original",
      status: "complete",
      error: null,
      createdAt: "2026-10-03T00:00:00Z",
    },
  ],
  tracks: [
    {
      id: "preview-one",
      jobId: "preview-original",
      title: "Every Little Thing",
      duration: 245,
      lyrics:
        "The coffee going cold beside the window\nThe laughter coming down the hall\nOf all the roads that brought me here\nI'd choose the one that led to you\n\nEvery little thing we are\nEvery ordinary day\nA thousand quiet reasons\nI'd choose you anyway\n\nThe photographs we never printed\nThe stories only we would know\nAll the moments in between\nBecame the life I call my own\n\nEvery little thing we are\nEvery ordinary day\nA thousand quiet reasons\nI'd choose you anyway",
    },
    {
      id: "preview-two",
      jobId: "preview-original",
      title: "Always You",
      duration: 235,
      lyrics:
        "The coffee going cold beside the window\nThe laughter coming down the hall\nOf all the roads that brought me here\nI'd choose the one that led to you\n\nEvery little thing we are\nEvery ordinary day\nA thousand quiet reasons\nI'd choose you anyway\n\nThe photographs we never printed\nThe stories only we would know\nAll the moments in between\nBecame the life I call my own\n\nEvery little thing we are\nEvery ordinary day\nA thousand quiet reasons\nI'd choose you anyway",
    },
  ],
};
export const studioPreviewAllowed = () =>
  process.env.VERCEL_ENV !== "production";
