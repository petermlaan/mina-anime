import type { Metadata } from "next";
import { Geist, Style_Script } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

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
  title: "Mina Anime",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${styleScript.variable} ${geistSans.variable}`}>
        <body>
          <header>
            <Link href="/">
              <h1>Mina Anime</h1>
            </Link>
            <nav>
              <ul>
                <li><Link href="/search" prefetch={false}>SÖK</Link></li>
                <li><Link href="/" prefetch={false}>SPARADE</Link></li>
              </ul>
            </nav>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
