"use client";

import React, { useEffect, useState } from "react";
import Form from "next/form";
import { useSearchParams } from 'next/navigation';
import { getCategoryList } from "@/lib/client/clientutil";
import { toPascalCase } from "@/lib/util";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || undefined;
  const type = searchParams.get('type') as string | undefined;
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategoryList().then(res => setCategories(res));
  }, [])

  return (
    <Form action={"/"} className="flex flex-wrap justify-center gap-4">
      <label id="lblType" htmlFor="selType">Typ:
        <select id="selType" name="type" defaultValue={type}>
          <option value="">Category</option>
          {categories.map((c, i) =>
            <option value={c} key={i}>{toPascalCase(c)}</option>
          )}
        </select>
      </label>
      <input type="search" name="q" defaultValue={q} placeholder="Sök..." />
      <button type="submit">Sök</button>
    </Form>
  );
}
