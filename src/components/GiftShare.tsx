"use client";

import { useId, useState } from "react";

/** Only accepts the recipient path. Never share location.href from an owner page. */
export function GiftShare({ giftPath, recipient }: { giftPath: string; recipient: string }) {
  const fieldId = useId();
  const [url, setUrl] = useState("");
  const [notice, setNotice] = useState("");
  const [sharing, setSharing] = useState(false);

  function recipientUrl() {
    return new URL(giftPath, window.location.origin).href;
  }

  async function copy() {
    const link = recipientUrl();
    setUrl(link);
    try {
      await navigator.clipboard.writeText(link);
      setNotice("Gift link copied. Paste it into a message to send it.");
    } catch {
      setNotice("Select and copy the gift link below, then paste it into your message.");
    }
  }

  async function send() {
    const link = recipientUrl();
    setUrl(link);
    setNotice("");
    if (!navigator.share) return;
    setSharing(true);
    try {
      await navigator.share({ title: `A song for ${recipient}`, text: "I made this song for you.", url: link });
      // The share sheet does not confirm delivery to the recipient.
    } catch (error) {
      setNotice(error instanceof Error && error.name === "AbortError"
        ? "Sharing canceled. Your gift link is still ready when you are."
        : "You can copy the gift link below or open an email draft.");
    } finally {
      setSharing(false);
    }
  }

  return (
    <div className="gift-share">
      <div className="delivery-actions">
        <button type="button" className="pill primary" disabled={sharing} onClick={() => void send()}>Send your gift <span aria-hidden="true">↗</span></button>
        <button type="button" className="pill" onClick={() => void copy()}>Copy gift link</button>
      </div>
      {url && (
        <div className="gift-share-options">
          <label htmlFor={fieldId}>Recipient’s gift link</label>
          <input id={fieldId} type="text" readOnly value={url} onFocus={(e) => e.currentTarget.select()} />
          <a href={`mailto:?subject=${encodeURIComponent(`A song for ${recipient}`)}&body=${encodeURIComponent(`I made this song for you.\n\n${url}`)}`}>Open an email draft ↗</a>
          <p>Share this link by text, email or your favorite messaging app. It opens their gift, without your editing controls.</p>
        </div>
      )}
      <p className="gift-share-notice" role="status">{notice}</p>
    </div>
  );
}
