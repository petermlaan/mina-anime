import React, { Suspense } from "react";
import { Metadata } from "next";
import styles from "./page.module.css";
import { SavedAnimes } from "@/app/savedanimes";

export const metadata: Metadata = {
  title: "Mina Anime"
};

export default async function Page() {
  console.log("SavedAnimes Page");

  return (
    <main className={styles.main}>
      <Suspense fallback="Laddar listan...">
        <SavedAnimes />
      </Suspense>
    </main>
  );
}
