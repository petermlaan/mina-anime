import React, { Suspense } from "react";
import { Metadata } from "next";
import { SavedAnimes } from "@/app/savedanimes";

export const metadata: Metadata = {
  title: "Mina Anime"
};

export default async function Page() {
  return (
    <main className="grid gap-4">
      <Suspense fallback="Laddar listan...">
        <SavedAnimes />
      </Suspense>
    </main>
  );
}
