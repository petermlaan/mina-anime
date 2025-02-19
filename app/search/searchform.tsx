"use client";

import React from "react";
import Form from "next/form";
import { useSearchParams } from 'next/navigation';
import { AnimeType } from '@tutkli/jikan-ts';
import styles from "./page.module.css";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || undefined;
  const type = searchParams.get('type') as AnimeType | undefined;
  const min_score = searchParams.get('min_score') ? parseInt(searchParams.get('min_score')!) : 0;

  return (
    <Form action={"/search"} className={styles.searchform}>
      <label id="lblMinScore" htmlFor="selMinScore">Minsta poäng: 
        <select id="selMinScore" name="min_score" defaultValue={min_score}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(score => (
            <option key={score} value={score}>{score}</option>
          ))}
        </select>
      </label>
      <label id="lblType" htmlFor="selType">Typ: 
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
      <input type="search" name="q" defaultValue={q} placeholder="sökord" />
      <button type="submit">Sök</button>
    </Form>
  );
}
