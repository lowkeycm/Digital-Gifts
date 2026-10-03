"use client";

import type { MusicPreferences } from "@/lib/intake";

export function SoundPreferences({ value, onChange }: {
  value: MusicPreferences;
  onChange: (key: keyof MusicPreferences, value: string) => void;
}) {
  return (
    <details className="sound-preferences">
      <summary>
        <span>Make the sound more yours <small>Optional</small></span>
        <span className="sound-toggle" aria-hidden="true">+</span>
      </summary>
      <div className="sound-preferences-body">
        <p className="sound-intro">Have a sound in mind? Tell us in your own words. Fill in what matters to you and leave the rest to us.</p>
        <div className="field">
          <label htmlFor="sound-description">Describe the song you’re imagining</label>
          <textarea id="sound-description" maxLength={400} value={value.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="A cozy acoustic song that starts quietly, then opens into a chorus we can sing together..." />
        </div>
        <div className="row">
          <div className="field">
            <label htmlFor="sound-mood">How should it feel?</label>
            <select id="sound-mood" value={value.mood} onChange={(e) => onChange("mood", e.target.value)}>
              <option value="">Let the story guide it</option>
              <option>Warm and romantic</option><option>Joyful and uplifting</option>
              <option>Tender and reflective</option><option>Playful and fun</option>
              <option>Big and cinematic</option><option>Raw and gritty</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="sound-energy">What kind of pace?</label>
            <select id="sound-energy" value={value.energy} onChange={(e) => onChange("energy", e.target.value)}>
              <option value="">Let the story guide it</option>
              <option>Slow and relaxed</option><option>Steady, mid-tempo</option>
              <option>Fast and energetic</option><option>Start soft, build up</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="sound-vocals">What should the voice sound like?</label>
          <textarea id="sound-vocals" maxLength={250} value={value.vocals}
            onChange={(e) => onChange("vocals", e.target.value)}
            placeholder="Warm and a little raspy, soft and breathy, a big soulful chorus, sung verses with a rap bridge..." />
        </div>
        <div className="field">
          <label htmlFor="sound-instruments">Any instruments you’d love to hear?</label>
          <input id="sound-instruments" maxLength={200} value={value.instruments}
            onChange={(e) => onChange("instruments", e.target.value)} placeholder="Piano and strings, fingerpicked guitar, a deep bass groove..." />
        </div>
        <div className="field">
          <label htmlFor="sound-inspiration">Any era, artist or song that captures the vibe?</label>
          <input id="sound-inspiration" aria-describedby="sound-inspiration-help" maxLength={200} value={value.inspiration}
            onChange={(e) => onChange("inspiration", e.target.value)} placeholder="90s R&B, an acoustic coffeehouse, an 80s movie ending..." />
          <p className="help" id="sound-inspiration-help">A reference helps describe the sound. Your song will have its own melody and voice.</p>
        </div>
        <div className="field">
          <label htmlFor="sound-avoid">Anything you don’t want?</label>
          <input id="sound-avoid" maxLength={200} value={value.avoid}
            onChange={(e) => onChange("avoid", e.target.value)} placeholder="No heavy drums, no rap, no electronic sounds..." />
        </div>
      </div>
    </details>
  );
}
