"use client";

import React from "react";
import Form from "next/form";
import { useSearchParams } from 'next/navigation';

export default function SearchForm() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || undefined;
  const type = searchParams.get('type') as string | undefined;

  return (
    <Form action={"/search"} className="flex flex-wrap justify-center gap-4">
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
      <input type="search" name="q" defaultValue={q} placeholder="Sök..." />
      <button type="submit">Sök</button>
    </Form>
  );
}
