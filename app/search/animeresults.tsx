"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Anime, AnimeClient, AnimeSearchParams, AnimeType, JikanResponse } from '@tutkli/jikan-ts';
import { Cards } from "@/components/cards";

export default function AnimeResults() {
  const searchParams = useSearchParams();

  const [response, setResponse] = useState<JikanResponse<Anime[]> | null>(null);
  const [errormsg, setErrormsg] = useState<string>("");

  const q = searchParams.get('q') || undefined;
  const type = searchParams.get('type') as AnimeType | undefined;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const min_score = searchParams.get('min_score') ? parseInt(searchParams.get('min_score')!) : 0;

  const loadData = async () => {
    try {
      const jikanAPI = new AnimeClient({ enableLogging: false });
      const sp: AnimeSearchParams = {
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
      setErrormsg("Fel! Ingen animedata!" + err);
    }
  };

  useEffect(() => {
    loadData();
  }, [q, type, page, min_score]);

  if (!response?.data) {
    if (errormsg)
      return <div>{errormsg}</div>;
    return <div>Söker...</div>;
  }

  return <Cards animes={response.data} />;
}
