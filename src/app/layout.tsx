import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/dm-sans";
import "./globals.css";

export const metadata: Metadata = {
  referrer: "no-referrer",
  title: "The Gift Smith | Gifts made personal",
  description: "Personal gifts made from memories, photos and the details only you know.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body>
    </html>
  );
}
