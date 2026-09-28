"use client";
import { useState } from "react";
const notes = [
  {
    label: "For your partner",
    prompt: "What’s a little thing that’s very them?",
    simple: "You always make me laugh.",
    detail:
      "You give the GPS a pep talk every time we miss a turn. We’ve been lost together for twelve years. I wouldn’t change a mile.",
  },
  {
    label: "For your mom",
    prompt: "What do you remember that she might have forgotten?",
    simple: "Thanks for always being there.",
    detail:
      "You left the porch light on until I got home. Even when I was thirty. I finally understand that wasn’t about the light.",
  },
  {
    label: "For your best friend",
    prompt: "Which story still gets told every time you meet?",
    simple: "We’ve had so many good times.",
    detail:
      "Our first apartment had two mugs, one wobbly table and no curtains. You called it our penthouse. We laughed until the neighbors knocked.",
  },
];
export function StoryNotes() {
  const [selected, setSelected] = useState(0);
  const note = notes[selected];
  return (
    <div className="story-workshop">
      <div className="story-selectors" aria-label="Choose a story example">
        {notes.map((n, i) => (
          <button
            key={n.label}
            type="button"
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            {n.label}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className="paper-note" aria-live="polite">
        <div className="note-top">
          <span>A little inspiration</span>
          <span>0{selected + 1} / 03</span>
        </div>
        <h3>{note.prompt}</h3>
        <p className="thin-story">“{note.simple}”</p>
        <p className="rich-story" key={selected}>
          “{note.detail}”
        </p>
        <span className="note-caption">
          Illustrative story, not a customer quote.
        </span>
      </div>
    </div>
  );
}
