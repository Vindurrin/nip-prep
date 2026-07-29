import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NIP Prep | Nokia Interview Cram",
  description: "A source-backed Nokia Fixed Networks interview cram site.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
