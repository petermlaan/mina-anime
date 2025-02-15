import React from "react";
import { Anime } from '@tutkli/jikan-ts';
import { createClient } from '@supabase/supabase-js'
import { Cards } from "@/components/cards";
import { Metadata } from "next";
import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "Mina Anime"
};

export default async function Page() {
  const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");

  const { data, error } = await supabase
    .from("user_anime_selections")
    .select("anime_data");
  let animes: Anime[] = [];
  if (data)
    animes = data[0].anime_data;

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
      <Cards animes={animes} />
    </main>
  );
}
