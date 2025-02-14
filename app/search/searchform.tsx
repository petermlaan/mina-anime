"use client";

import React from "react";
import Form from "next/form";
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimeType } from '@tutkli/jikan-ts';

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get('q') || undefined;
  const type = searchParams.get('type') as AnimeType | undefined;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const min_score = searchParams.get('min_score') ? parseInt(searchParams.get('min_score')!) : 0;

  const onPrevPage = () => {
    if (page > 1) {
      const params = new URLSearchParams(searchParams);
      const nextPage = page - 1;
      params.set('page', nextPage.toString());
      router.push(`/search?${params.toString()}`);
    }
  };

  const onNextPage = () => {
    const params = new URLSearchParams(searchParams);
    const nextPage = page + 1;
    params.set('page', nextPage.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Form id="frmSearch" action={"/search"}>
      <label id="lblMinScore" htmlFor="selMinScore">Typ
        <select id="selMinScore" name="min_score" defaultValue={min_score}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(score => (
            <option key={score} value={score}>{score}</option>
          ))}
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
        className={page < 2 ? "disabled" : ""}
        disabled={page < 2}
        onClick={onPrevPage} >
        &lt; Föreg
      </button>
      <button id="btnNextPage" type="button"
        onClick={onNextPage} >
        Nästa &gt;
      </button>
      <label id="lblShowList" htmlFor="chkShowList">Visa lista
        <input type="checkbox" id="chkShowList" />
      </label>
    </Form>
  );
}
