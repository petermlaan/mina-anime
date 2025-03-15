"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Amount from "./amount";
import LinkNP from "./linknp";
import { Product } from "@/lib/interfaces";

interface ProductListProps {
    products: Product[];
}
type TableColumn = "" | "title";

export function ProductList({ products }: ProductListProps) {
    const [lastSort, setLastSort] = useState<TableColumn>("");
    const [sortedProducts, setSortedProducts] = useState(products);

    useEffect(() => {
        setSortedProducts(products);
    }, [products]);

    const onSort = (column: TableColumn) => {
        switch (column) {
            case "title":
                if (lastSort === "title") {
                    setSortedProducts(sortedProducts.sort((a, b) =>
                        b.title.localeCompare(a.title)));
                    setLastSort("");
                } else {
                    setSortedProducts(sortedProducts.sort((a, b) =>
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
                        <ProductRow key={i} product={a} />)}
                </tbody>
            </table>
        </section>
    );
}

interface ProductRowProps {
    product: Product;
}

export function ProductRow({ product }: ProductRowProps) {
    return (
        <tr>
            <td>
                <Amount product={product} />
            </td>
            <td className="px2"><div><LinkNP href={"product/" + product.id}>
                {product.title}
            </LinkNP></div></td>
        </tr>
    );
}
