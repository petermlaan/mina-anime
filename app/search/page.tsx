import React, { Suspense } from "react";
import SearchForm from "./searchform";
import AnimeResults from "./animeresults";
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Mina Anime - Sök"
};

export default function PageSearch() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div>Loading search form...</div>}>
        <SearchForm />
      </Suspense>
      <Suspense fallback={<div>Loading anime results...</div>}>
        <AnimeResults />
      </Suspense>
    </main>
  );
}
