import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Song | Personalized songs from real memories",
  description: "Turn the details that matter into a one-of-one song.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
