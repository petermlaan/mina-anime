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
import { AnimeProvider } from "@/components/animecontext";

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
    <html lang="en" className={`${styleScript.variable} ${geistSans.variable}`}>
      <body>
        <ClerkProvider>
          <header className="border-b-2 border-(--clr-main2)">
            <div className="sm:pl-4 w-fit">
              <Link href="/">
                <h1 className="text-4xl/15 font-(family-name:--font-style-script)">Mina Anime</h1>
              </Link>
            </div>
            <nav>
              <ul>
                <li><Link href="/search" prefetch={false}>SÖK</Link></li>
                <li><Link href="/" prefetch={false}>SPARADE</Link></li>
              </ul>
            </nav>
            <div className="user">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <AnimeProvider>
            {children}
          </AnimeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
