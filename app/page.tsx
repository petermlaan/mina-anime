import React, { Suspense } from "react";
import { Metadata } from "next";
import styles from "./page.module.css";
import { SavedAnimes } from "@/app/savedanimes";

export const metadata: Metadata = {
  title: "Mina Anime"
};

export default async function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.toprow}>
        <label htmlFor="chkFilterWatched">Dölj sedda
          <input type="checkbox" id="chkFilterWatched" />
        </label>
        <label htmlFor="chkShowList">Visa lista
          <input type="checkbox" id="chkShowList" />
        </label>
      </div>
      <Suspense fallback="Laddar listan...">
        <SavedAnimes showList={false} />
      </Suspense>
    </main>
  );
}
