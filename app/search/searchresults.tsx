"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Cards } from "@/components/cards";
import { SearchResult } from "@/lib/interfaces";
import { searchAnime } from "@/lib/client/clientutil";
import { AnimeList } from "@/components/animelist";
import { useProductContext } from "@/components/animecontext";

export default function AnimeResults() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') || "";
    //const type = searchParams.get('type') as string | undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

    const ac = useProductContext();

    const [response, setResponse] = useState<SearchResult | null>(null);

    useEffect(() => {
        searchAnime(q).then(res => {
            res.products.forEach(a => a.saved = ac.myProducts.find(s => s.id === a.id)?.saved ?? false);
            setResponse(res);
        });
    }, [q, page]);

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
            <AnimeList products={response.products} search={true} /> :
            <Cards products={response.products} search={true} />}
    </>);
}
