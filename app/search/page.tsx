import React, { Suspense } from "react"
import { Metadata } from "next"
import SearchForm from "./searchform"
import AnimeResults from "./searchresults"

export const metadata: Metadata = {
  title: "Mina Anime - Sök"
}

export default function SearchPage() {
  return (
    <main className="grid gap-4">
      <Suspense fallback={<div>Laddar sökformuläret...</div>}>
        <SearchForm />
      </Suspense>
      <Suspense fallback={<div>Laddar sidan...</div>}>
        <AnimeResults />
      </Suspense>
    </main>
  )
}
