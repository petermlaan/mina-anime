import type { Metadata } from "next";
import { Geist, Style_Script } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ProductProvider } from "@/components/animecontext";
import LinkNP from "@/components/linknp";

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
              <LinkNP href="/">
                <h1 className="text-4xl/15 font-(family-name:--font-style-script)">Acme Inc</h1>
              </LinkNP>
            </div>
            <nav>
              <ul>
                <li><LinkNP href="/search">SÖK</LinkNP></li>
                <li><LinkNP href="/">SPARADE</LinkNP></li>
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
          <ProductProvider>
            {children}
          </ProductProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
