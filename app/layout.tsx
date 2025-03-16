import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ProductProvider } from "@/components/acmecontext";
import LinkNP from "@/components/linknp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acme Inc",
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
    <html lang="en" className={`${geistSans.variable}`}>
      <body>
        <ClerkProvider>
          <header className="border-b-2 border-(--clr-main2)">
            <div className="sm:pl-4 w-fit">
              <LinkNP href="/">
                <h1 className="text-4xl/15">Acme Inc</h1>
              </LinkNP>
            </div>
            <nav>
              <ul>
                <li><LinkNP href="/">PRODUCTS</LinkNP></li>
                <li><LinkNP href="/cart">CART</LinkNP></li>
              </ul>
            </nav>
            <div className="justify-self-end align-self-center mr-4 height: fit-content flex gap4">
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
