import type { Metadata } from "next";
import { Geist, Style_Script } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const styleScript = Style_Script({
  variable: "--font-style-script",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mina Anime"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${styleScript.variable} ${geistSans.variable}`}>
      <body>
        <header>
          <Link href="/">
            <h1>Mina Anime</h1>
          </Link>
          <nav id="topmenu">
            <ul>
              <li><Link href="/search" id="mnuSearch">SÖK</Link></li>
              <li><Link href="/" id="mnuCards">SPARADE</Link></li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
