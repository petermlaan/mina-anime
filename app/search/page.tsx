"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Form from "next/form";
import styles from "./page.module.css";
import { Anime, AnimeClient, AnimeSearchParams, AnimeType, JikanResponse } from '@tutkli/jikan-ts';
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
  const min_score = searchParams.get('min_score') ? parseInt(searchParams.get('min_score')!) : 0;

  const loadData = async () => {
    try {
      console.log("loadData window", window);
      const jikanAPI = new AnimeClient({ enableLogging: true });
      let sp: AnimeSearchParams = {
        q, type, page, sfw: true, min_score
      };
      if (!q) {
        sp.order_by = "score";
        sp.sort = "desc";
      }
      const animeData = await jikanAPI.getAnimeSearch(sp);
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
  }, [q, type, page, min_score]);

  const onPrevPage = () => {
    if (page > 1) {
      const params = new URLSearchParams(searchParams);
      const nextPage = page - 1;
      params.set('page', nextPage.toString());
      router.push(`/search?${params.toString()}`);
    }
  };

  const onNextPage = () => {
    if (response?.pagination?.has_next_page) {
      const params = new URLSearchParams(searchParams);
      const nextPage = page + 1;
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
        <label id="lblMinScore" htmlFor="selMinScore">Typ
          <select id="selMinScore" name="min_score" defaultValue={min_score}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
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
        <button id="btnPrevPage" type="button"
          className={page<2 ? "disabled" : ""}
          disabled={page<2}
          onClick={onPrevPage} >
          &lt; Föreg
        </button>
        <button id="btnNextPage" type="button"
          className={response.pagination?.has_next_page ? "" : "disabled"}
          disabled={!response.pagination?.has_next_page}
          onClick={onNextPage} >
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
