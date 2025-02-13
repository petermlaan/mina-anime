"use client";

import React, { useEffect, useState } from "react";
import Form from "next/form";
import styles from "./page.module.css";
import { Anime, AnimeClient, AnimeSearchParams } from '@tutkli/jikan-ts';
import { Cards } from "@/components/cards";

type Props = {
  params: {};
  searchParams: Promise<{ q: string | undefined }>;
};

export default function PageSearch({searchParams}: Props) {
  // State
  const query = React.use(searchParams).q;
  const [animes, setAnimes] = useState<Anime[] | null>(null);
  const [errormsg, setErrormsg] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const jikanAPI = new AnimeClient({ enableLogging: true });
        const animeData = (await jikanAPI.getAnimeSearch({q: query})).data;
        setAnimes(animeData);
        if (!animeData) {
          setErrormsg("Ingen animedata!");
        }
      } catch (err) {
        setErrormsg("Fel! Ingen animedata!");
      }
    };
    loadData();
  }, [query]);

  if (!animes) {
    if (errormsg)
      return <div>{errormsg}</div>;
    return <div>Söker...</div>;
  }

  return (
    <main>
      <Form id="frmSearch" action={"/search"}>
        <label id="lblTopSearch" htmlFor="chkTopSearch">Toppsök
          <input type="checkbox" id="chkTopSearch" />
        </label>
        <label id="lblType" htmlFor="selType">Typ
          <select id="selType">
            <option value=""></option>
            <option value="tv">TV</option>
            <option value="movie">Film</option>
          </select>
        </label>
        <input id="txtQuery" type="search" name="q" />
        <button id="btnSearch" type="submit">Sök</button>
        <button id="btnPrevPage" className="disabled" disabled>&lt; Föreg</button>
        <button id="btnNextPage" className="disabled" disabled>Nästa &gt;</button>
        <label id="lblShowList" htmlFor="chkShowList">Visa lista
          <input type="checkbox" id="chkShowList" />
        </label>
      </Form>
      <section id="main">
        <Cards animes={animes} />
      </section>
    </main>
  );
}


