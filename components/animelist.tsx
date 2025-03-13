"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useProductContext } from "./acmecontext";
import LinkNP from "./linknp";
import { Product } from "@/lib/interfaces";

interface AnimeListProps {
    products: Product[];
    search: boolean; // true for searchPage, false for Page (saved animes).
}
type TableColumn = "" | "title";

export function AnimeList({ products, search = false }: AnimeListProps) {
    const [lastSort, setLastSort] = useState<TableColumn>("");
    const [sortedAnimes, setSortedAnimes] = useState(products);

    useEffect(() => {
        setSortedAnimes(products);
    }, [products]);

    const onSort = (column: TableColumn) => {
        switch (column) {
            case "title":
                if (lastSort === "title") {
                    setSortedAnimes(sortedAnimes.sort((a, b) =>
                        b.title.localeCompare(a.title)));
                    setLastSort("");
                } else {
                    setSortedAnimes(sortedAnimes.sort((a, b) =>
                        a.title.localeCompare(b.title)));
                    setLastSort("title");
                }
                break;
        }
    };

    return (
        <section className="bg-(--clr-main1)">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th className="px2 tal"><Link href={"#"}
                            onClick={() => onSort("title")}>Titel</Link></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((a, i) =>
                        <ProductRow key={i} product={a} search={search} />)}
                </tbody>
            </table>
        </section>
    );
}

interface ProductRowProps {
    product: Product;
    search: boolean;
}

export function ProductRow({ product, search }: ProductRowProps) {
    const ac = useProductContext();
    
    return (
        <tr>
            <td><input type="number" min="0" value={product.amount}
                onChange={(e) => ac.changeAmount(product, +e.target.value)}/>
            </td>
            <td className="px2"><div><LinkNP href={"anime/" + product.id}>
                {product.title + search}
            </LinkNP></div></td>
        </tr>
    );
}
