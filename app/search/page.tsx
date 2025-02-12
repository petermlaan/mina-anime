import Form from "next/form";
import styles from "./page.module.css";
import { Cards } from "@/components/cards";
import { searchAnimes } from "@/anime";

type Props = {
  params: {};
  searchParams: { q: string | undefined };
};

export default async function PageSearch(props: Props) {
  const searchParams = await props.searchParams;
  console.log(searchParams);
  const query = searchParams.q ?? "";
  const res = await searchAnimes(query);

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
        <Cards animes={res.data} />
      </section>
    </main>
  );
}

