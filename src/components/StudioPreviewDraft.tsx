"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";
import { studioPreview } from "@/lib/studio-preview";
import type { StudioState } from "./SongStudio";

type Draft = { state: StudioState; step: string; photo: Blob | null };
const initial: Draft = { state: studioPreview, step: "listen", photo: null };
const Context = createContext<{
  draft: Draft;
  photoUrl: string | null;
  ready: boolean;
  error: string;
  setState: Dispatch<SetStateAction<StudioState | null>>;
  setStep: Dispatch<SetStateAction<string>>;
  setPhoto: (file: File | null) => Promise<void>;
  flush: () => Promise<void>;
} | null>(null);

function database(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("song-studio-design-preview", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("drafts");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function readDraft(): Promise<Draft | undefined> {
  const db = await database();
  try {
    return await new Promise((resolve, reject) => {
      const request = db
        .transaction("drafts")
        .objectStore("drafts")
        .get("current");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}
async function writeDraft(draft: Draft) {
  const db = await database();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction("drafts", "readwrite");
      transaction.objectStore("drafts").put(draft, "current");
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
}
export function StudioPreviewDraft({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState(initial),
    [ready, setReady] = useState(false),
    [photoUrl, setPhotoUrl] = useState<string | null>(null),
    [error, setError] = useState("");
  const current = useRef(draft);
  useEffect(() => {
    let active = true;
    readDraft()
      .then((saved) => {
        if (
          active &&
          saved?.state?.tracks &&
          saved.state.recipientName === studioPreview.recipientName
        ) {
          current.current = saved;
          setDraft(saved);
        }
      })
      .catch(() => {
        if (active)
          setError(
            "This browser couldn’t save the preview. Keep this tab open while editing.",
          );
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    const url = draft.photo ? URL.createObjectURL(draft.photo) : null;
    const timer = setTimeout(() => setPhotoUrl(url), 0);
    return () => {
      clearTimeout(timer);
      if (url) URL.revokeObjectURL(url);
    };
  }, [draft.photo]);
  function update(next: Draft) {
    current.current = next;
    setDraft(next);
  }
  // Queue writes so rapid typing cannot allow an older draft to overwrite a newer one.
  const pending = useRef(Promise.resolve());
  function persist() {
    const snapshot = current.current;
    pending.current = pending.current
      .catch(() => {})
      .then(() => writeDraft(snapshot));
    return pending.current;
  }
  function autosave() {
    void persist().catch(() =>
      setError(
        "Your preview couldn’t be saved. Keep this tab open and try again.",
      ),
    );
  }
  return (
    <Context.Provider
      value={{
        draft,
        photoUrl,
        ready,
        error,
        setState: (value) => {
          const state =
            typeof value === "function" ? value(current.current.state) : value;
          if (state) {
            update({ ...current.current, state });
            autosave();
          }
        },
        setStep: (value) => {
          update({
            ...current.current,
            step:
              typeof value === "function" ? value(current.current.step) : value,
          });
          autosave();
        },
        setPhoto: async (photo) => {
          update({ ...current.current, photo });
          await persist().catch(() =>
            setError("The photo couldn’t be saved. Try a smaller image."),
          );
        },
        flush: persist,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useStudioPreviewDraft = () => useContext(Context);
