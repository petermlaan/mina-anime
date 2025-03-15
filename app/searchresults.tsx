"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Cards } from "@/components/cards";
import { SearchResult } from "@/lib/interfaces";
import { getProductsByCategory, searchAnime as searchProduct } from "@/lib/client/clientutil";
import { ProductList } from "@/components/productlist";
import { useProductContext } from "@/components/acmecontext";

export default function SearchResults() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') || "";
    const category = searchParams.get('type') as string | undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const [response, setResponse] = useState<SearchResult | null>(null);
    const ac = useProductContext();

    useEffect(() => {
        console.log("SearchResults: ", q, category);
        if (!category || q) {
            searchProduct(q).then(res => {
                console.log("SearchResults - res: ", res);
                console.log("SearchResults - myProducts: ", ac.myProducts);
                res.products.forEach(a => a.amount = ac.myProducts.find(s => s.id === a.id)?.amount ?? 0);
                if (category)
                    res.products = res.products.filter(p => p.category === category);
                setResponse(res);
            })
        } else {
            getProductsByCategory(category).then(res => {
                res.products.forEach(a => a.amount = ac.myProducts.find(s => s.id === a.id)?.amount ?? 0);
                setResponse(res);
            })
        }
    }, [q, category, ac.myProducts]);

    const onPrevPage = () => {
        if (page > 1) {
            const params = new URLSearchParams(searchParams);
            const nextPage = page - 1;
            params.set('page', nextPage.toString());
            //router.push(`/search?${params.toString()}`);
        }
    };

    const onNextPage = () => {
        const params = new URLSearchParams(searchParams);
        const nextPage = page + 1;
        params.set('page', nextPage.toString());
        //router.push(`/search?${params.toString()}`);
    };

    if (!response?.products) {
        return <div className="grid justify-center mt-14 text-4xl">Söker...</div>;
    }

    return (<>
        <div className="flex justify-center items-center gap-8">
            <button type="button"
                className={page < 2 ? "disabled" : ""}
                disabled={page < 2}
                onClick={onPrevPage} >
                &lt; Föreg
            </button>
            <label htmlFor="chkShowList" className="checkbox">Visa lista:
                <input type="checkbox" id="chkShowList"
                    checked={ac.showSearchList}
                    onChange={() => ac.setShowSearchList(!ac.showSearchList)} />
            </label>
            <button type="button"
                className={response.total > (response.skip + response.limit) ? "" : "disabled"}
                disabled={!(response.total > (response.skip + response.limit))}
                onClick={onNextPage} >
                Nästa &gt;
            </button>
        </div>
        {ac.showSearchList ?
            <ProductList products={response.products} search={true} /> :
            <Cards products={response.products} search={true} />}
    </>);
}
