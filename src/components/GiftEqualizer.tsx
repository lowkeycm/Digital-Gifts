"use client";
import { useEffect, useRef, type CSSProperties, type RefObject } from "react";

const frequencies = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const labels = ["32", "64", "125", "250", "500", "1k", "2k", "4k", "8k", "16k"];

export function GiftEqualizer({
  recipient,
  playing,
  analyser,
  onToggle,
}: {
  recipient: string;
  playing: boolean;
  analyser: RefObject<AnalyserNode | null>;
  onToggle: () => void;
}) {
  const display = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const bands = Array.from(
      display.current?.querySelectorAll<HTMLElement>(".eq-band") ?? [],
    );
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const reset = () =>
      bands.forEach((band) => band.style.setProperty("--level", "0"));
    const draw = () => {
      const node = analyser.current;
      if (!playing || motion.matches || !node) {
        reset();
        return;
      }
      const data = new Uint8Array(node.frequencyBinCount);
      const binWidth = node.context.sampleRate / node.fftSize;
      const sample = () => {
        node.getByteFrequencyData(data);
        bands.forEach((band, index) => {
          const low = Math.max(
            1,
            Math.floor(frequencies[index] / Math.SQRT2 / binWidth),
          );
          const high = Math.min(
            data.length - 1,
            Math.ceil((frequencies[index] * Math.SQRT2) / binWidth),
          );
          let peak = 0;
          for (let i = low; i <= high; i++) peak = Math.max(peak, data[i]);
          band.style.setProperty(
            "--level",
            String(Math.round((peak / 255) * 18) / 18),
          );
        });
        frame = requestAnimationFrame(sample);
      };
      sample();
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      draw();
    };
    draw();
    motion.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", restart);
      reset();
    };
  }, [playing, analyser]);
  return (
    <button
      type="button"
      className="gift-equalizer gift-object"
      onClick={onToggle}
      aria-label={
        playing ? "Pause the equalizer’s song" : "Play the equalizer’s song"
      }
    >
      <span className="eq-cabinet" aria-hidden="true" />
      <span ref={display} className="eq-display" aria-hidden="true">
        <span className="eq-frequencies">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </span>
        <span className="eq-bars">
          {labels.map((label) => (
            <span key={label} className="eq-band">
              <i />
            </span>
          ))}
        </span>
        <span className="eq-frequency-unit">Hz</span>
      </span>
      <span
        className="eq-name"
        aria-hidden="true"
        style={
          {
            "--name-scale": Math.min(1, Math.pow(14 / recipient.length, 0.8)),
          } as CSSProperties
        }
      >
        {recipient}
      </span>
    </button>
  );
}
