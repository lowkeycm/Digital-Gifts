"use client";
import Link from "next/link";
import { useState } from "react";
import { GiftBrand, Arrow } from "./GiftBrand";
import { YourSongBrand } from "./YourSongBrand";

export function GiftNav({ product = false }: { product?: boolean }) {
  const [open, setOpen] = useState(false);
  const links = product
    ? [
        { href: "/your-song#how", name: "How it works" },
        { href: "/your-song#samples", name: "Hear a sample" },
        { href: "/your-song#questions", name: "Questions" },
      ]
    : [
        { href: "/#gifts", name: "Our first gift" },
        { href: "/#how", name: "Made personal" },
        { href: "/your-song", name: "Your Song" },
      ];
  return (
    <>
      <header id="top" className="gift-header">
        <div className="shell gift-nav">
          {product ? <YourSongBrand /> : <GiftBrand />}
          <nav className="gift-desktop-nav" aria-label="Main navigation">
            {links.map((l) => (
              <Link href={l.href} key={l.href}>
                {l.name}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <Link
              className="gift-button nav-button"
              href={product ? "/create" : "/#gifts"}
            >
              {product ? "Start your song" : "Explore gifts"}
              <Arrow />
            </Link>
            <button
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        {open && (
          <nav
            className="mobile-nav shell"
            id="mobile-nav"
            aria-label="Mobile navigation"
          >
            {links.map((l) => (
              <Link onClick={() => setOpen(false)} href={l.href} key={l.href}>
                {l.name}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link
              onClick={() => setOpen(false)}
              href={product ? "/" : "/create"}
            >
              {product ? "All gifts" : "Start your song"}
              <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
