"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Cards } from "@/components/cards";
import { Product, SearchResult } from "@/lib/interfaces";
import { ProductList } from "@/components/productlist";
import { useProductContext } from "@/components/acmecontext";

export default function SearchResults({ searchResult }: { searchResult: SearchResult }) {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const [products, setProducts] = useState<Product[] | null>(null);
    const ac = useProductContext();
    const router = useRouter();

    useEffect(() => {
        // Set amounts for products in the cart
        setProducts(searchResult.products.map(p => { return { ...p, amount: ac.myProducts.find(s => s.id === p.id)?.amount ?? 0 }; }));
    }, [searchResult, ac.myProducts]);

    const onPrevPage = () => {
        if (page > 1) {
            const params = new URLSearchParams(searchParams);
            const nextPage = page - 1;
            params.set('page', nextPage.toString());
            router.push(`/?${params.toString()}`);
        }
    };

    const onNextPage = () => {
        const params = new URLSearchParams(searchParams);
        const nextPage = page + 1;
        params.set('page', nextPage.toString());
        router.push(`/?${params.toString()}`);
    };

    if (!products)
        return <>Söker...</>;

    return (<>
        <div className="flex justify-center items-center gap-8">
            <button type="button"
                className={page === 1 ? "disabled" : ""}
                disabled={page === 1}
                onClick={onPrevPage} >
                &lt; Föreg
            </button>
            <label htmlFor="chkShowList" className="checkbox">Visa lista:
                <input type="checkbox" id="chkShowList"
                    checked={ac.showSearchList}
                    onChange={() => ac.setShowSearchList(!ac.showSearchList)} />
            </label>
            <button type="button"
                className={page >= searchResult.maxpage ? "disabled" : ""}
                disabled={page >= searchResult.maxpage}
                onClick={onNextPage} >
                Nästa &gt;
            </button>
        </div>
        {ac.showSearchList ?
            <ProductList products={products} search={true} /> :
            <Cards products={products} search={true} />}
    </>);
}
