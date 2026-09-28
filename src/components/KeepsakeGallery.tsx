"use client";
import Image from "next/image";
import { useState } from "react";
const images = [
  {
    src: "/images/framed-song-concept.webp",
    title: "A story you can hold",
    alt: "Concept of a framed photo, song card and wrapped gift in warm afternoon light",
  },
  {
    src: "/images/couple-keepsake.webp",
    title: "For the life you share",
    alt: "Illustrative couple sharing a framed photo and song gift",
  },
  {
    src: "/images/mother-keepsake.webp",
    title: "For everything she gave",
    alt: "Illustrative mother and daughter sharing a framed photo keepsake",
  },
];
export function KeepsakeGallery() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="keepsake-gallery">
      <div className="keepsake-main">
        <Image
          src={images[selected].src}
          alt={images[selected].alt}
          fill
          sizes="(max-width: 760px) 100vw, 65vw"
        />
        <span className="concept-tag">Framed gift concept</span>
      </div>
      <div className="gallery-controls">
        <span className="gallery-caption" aria-live="polite">
          {images[selected].title}
        </span>
        <div className="gallery-thumbs">
          {images.map((im, i) => (
            <button
              key={im.src}
              type="button"
              aria-label={`View ${im.title.toLowerCase()}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <Image src={im.src} alt="" width={78} height={52} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
