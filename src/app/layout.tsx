import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Gifts | Personal gifts built from real stories",
  description: "Personal gifts made from memories, photos and the details only you know.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
