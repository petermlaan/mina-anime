import React, { Suspense } from "react";
import SearchForm from "./searchform";
import AnimeResults from "./searchresults";
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Mina Anime - Sök"
};

export default function PageSearch() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div>Laddar sökformuläret...</div>}>
        <SearchForm />
      </Suspense>
      <Suspense>
        <AnimeResults />
      </Suspense>
    </main>
  );
}
