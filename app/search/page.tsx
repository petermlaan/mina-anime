import React, { Suspense } from "react";
import { Metadata } from "next";
import styles from "./page.module.css";
import SearchForm from "./searchform";
import AnimeResults from "./searchresults";

export const metadata: Metadata = {
  title: "Mina Anime - Sök"
};

export default function PageSearch() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div>Laddar sökformuläret...</div>}>
        <SearchForm />
      </Suspense>
      <Suspense fallback={<div>Laddar sidan...</div>}>
        <AnimeResults />
      </Suspense>
    </main>
  );
}
