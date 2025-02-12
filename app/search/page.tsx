"use client";

import styles from "./page.module.css";
import { useSearchParams } from 'next/navigation'
 
export default async function PageSearch() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const url = "https://api.jikan.moe/v4/anime?sfw&q=" + query;
  const response = await fetch(url);
  if (!response.ok)
      throw new Error(response.status.toString());
  const data = await response.json();
return (
    <main>
      {JSON.stringify(data)}
      <form id="frmSearch">
        <label id="lblTopSearch" htmlFor="chkTopSearch" hidden>Toppsök
          <input type="checkbox" id="chkTopSearch" hidden />
        </label>
        <label id="lblType" htmlFor="selType" hidden>Typ
          <select id="selType" hidden>
            <option value=""></option>
            <option value="tv">TV</option>
            <option value="movie">Film</option>
          </select>
        </label>
        <input id="txtQuery" type="search" hidden />
        <button id="btnSearch" type="submit" hidden>Sök</button>
        <button id="btnPrevPage" className="disabled" disabled hidden>&lt; Föreg</button>
        <button id="btnNextPage" className="disabled" disabled hidden>Nästa &gt;</button>
        <label id="lblShowList" htmlFor="chkShowList">Visa lista
          <input type="checkbox" id="chkShowList" />
        </label>
      </form>
      <section id="cMain"></section>
    </main>
  );
}

