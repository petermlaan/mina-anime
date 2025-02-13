"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Form from "next/form";
import styles from "./page.module.css";
import { Anime, AnimeClient, AnimeType, JikanResponse } from '@tutkli/jikan-ts';
import { Cards } from "@/components/cards";

export default function PageSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);

  const [response, setResponse] = useState<JikanResponse<Anime[]> | null>(null);
  const [errormsg, setErrormsg] = useState<string>("");

  const q = searchParams.get('q') || undefined;
  const type = searchParams.get('type') as AnimeType | undefined;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

  const loadData = async () => {
    try {
      console.log("loadData");
      const jikanAPI = new AnimeClient({ enableLogging: true });
      const animeData = await jikanAPI.getAnimeSearch({ 
        q, type, page, sfw: true 
      });
      setResponse(animeData);
      if (!animeData) {
        setErrormsg("Ingen animedata!");
      }
    } catch (err) {
      setErrormsg("Fel! Ingen animedata!");
    }
  };

  useEffect(() => {
    loadData();
  }, [q, type, page]);
//}, [q, type, page]);
//}, [loadData]);

  const onNextPage = () => {
    if (response?.pagination?.has_next_page) {
      const nextPage = page + 1;
      const params = new URLSearchParams(searchParams);
      params.set('page', nextPage.toString());
      router.push(`/search?${params.toString()}`);
    }
  };

  if (!response?.data) {
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
          <select id="selType" name="type" defaultValue={type}>
            <option value=""></option>
            <option value="TV">TV</option>
            <option value="Movie">Film</option>
            <option value="Ova">Ova</option>
            <option value="Ona">Ona</option>
            <option value="Special">Special</option>
            <option value="Music">Musik</option>
          </select>
        </label>
        <input id="txtQuery" type="search" name="q" defaultValue={q} />
        <button id="btnSearch" type="submit">Sök</button>
        <button id="btnPrevPage" className="disabled" disabled>&lt; Föreg</button>
        <button 
          id="btnNextPage"
          type="button"
          className={response.pagination?.has_next_page ? "" : "disabled"}
          disabled={!response.pagination?.has_next_page}
          onClick={onNextPage}
        >
          Nästa &gt;
        </button>
        <label id="lblShowList" htmlFor="chkShowList">Visa lista
          <input type="checkbox" id="chkShowList" />
        </label>
      </Form>
      <section id="main">
        <Cards animes={response.data} />
      </section>
    </main>
  );
}

