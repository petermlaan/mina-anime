import React, { Suspense } from "react";
import { Metadata } from "next";
import SearchForm from "./searchform";
import SearchResults from "./searchresults";
import { getCategoryList } from "@/lib/client/clientutil";

export const metadata: Metadata = {
  title: "Sök - Acme Inc"
};

export default async function SearchPage() {
  const categories = await getCategoryList();

  return (
    <main className="grid gap-4">
      <Suspense fallback={<div>Laddar sökformuläret...</div>}>
        <SearchForm categories={categories} />
      </Suspense>
      <Suspense fallback={<div>Laddar sidan...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
