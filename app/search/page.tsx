import React, { Suspense } from "react";
import SearchForm from "./searchform";
import AnimeResults from "./animeresults";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mina Anime - Sök"
};

export default function PageSearch() {
  return (
    <main>
      <Suspense fallback={<div>Loading search form...</div>}>
        <SearchForm />
      </Suspense>
      <section id="main">
        <Suspense fallback={<div>Loading anime results...</div>}>
          <AnimeResults />
        </Suspense>
      </section>
    </main>
  );
}
