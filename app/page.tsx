import React, { Suspense } from "react";
import { Metadata } from "next";
import Form from "next/form";
import SearchResults from "./searchresults";
import { getCategoryList, getProductsByCategory, searchProducts } from "@/lib/productapi";
import { toPascalCase } from "@/lib/util";
import { APISearchResult, SearchResult } from "@/lib/interfaces";

export const metadata: Metadata = {
  title: "Sök - Acme Inc"
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const categories = await getCategoryList();
  const sp = await searchParams;
  const q = (sp.q ?? "") as string;
  const category = (sp.cat ?? "") as string;
  const page = +(sp.page ?? "1");

  let searchResult: APISearchResult | undefined = undefined;

  if (!category || q) {
    searchResult = await searchProducts(q, page);
    if (category) {
      searchResult!.products = searchResult.products.filter(p => p.category === category);
    }
  } else {
    searchResult = await getProductsByCategory(category);
  }
  const sr: SearchResult = {
    products: searchResult.products,
    maxpage: Math.floor(searchResult.total / 30) + 1
  };

  return (
    <main className="grid gap-4">
      <Form action={"/"} className="flex flex-wrap justify-center gap-4">
        <label htmlFor="selCat">Typ:
          <select id="selCat" name="cat" defaultValue={category}>
            <option value="">Category</option>
            {categories.map((c, i) =>
              <option value={c} key={i}>{toPascalCase(c)}</option>
            )}
          </select>
        </label>
        <input type="search" name="q" defaultValue={q} placeholder="Sök..." />
        <button type="submit">Sök</button>
      </Form>

      <Suspense fallback={<div>Laddar sidan...</div>}>
        <SearchResults searchResult={sr} />
      </Suspense>
    </main>
  );
}
