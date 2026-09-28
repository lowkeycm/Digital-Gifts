"use client";
import Link from "next/link";
import { useState } from "react";
import { GiftBrand, Arrow } from "./GiftBrand";

export function GiftNav({ product = false }: { product?: boolean }) {
  const [open, setOpen] = useState(false);
  const links = product
    ? [
        { href: "/your-song#how", name: "How it works" },
        { href: "/your-song#included", name: "What’s included" },
        { href: "/your-song#questions", name: "Questions" },
      ]
    : [
        { href: "/#gifts", name: "The collection" },
        { href: "/#how", name: "Made personal" },
        { href: "/#keepsakes", name: "Coming next" },
      ];
  return (
    <>
      <div className="preview-banner">
        Preview edition <span>·</span> Song generation and payments are not live
        yet.
      </div>
      <header id="top" className="gift-header">
        <div className="shell gift-nav">
          <GiftBrand />
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
              href={product ? "/create" : "/your-song"}
            >
              {product ? "Start your story" : "Explore Your Song"}
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
              href={product ? "/" : "/your-song"}
            >
              {product ? "All gifts" : "Your Song"}
              <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
