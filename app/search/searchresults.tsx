"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimeSearchParams, AnimeType, JikanResponse } from '@tutkli/jikan-ts';
import { Cards } from "@/components/cards";
import styles from "./searchresults.module.css";
import { MyAnime } from "@/lib/interfaces";
import Clock from "@/components/clock";
import { searchAnime } from "@/lib/client/clientutil";
import { AnimeList } from "@/components/animelist";
import { useAnimeContext } from "@/components/animecontext";

export default function AnimeResults() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') || undefined;
    const type = searchParams.get('type') as AnimeType | undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const min_score = searchParams.get('min_score') ? parseInt(searchParams.get('min_score')!) : 0;

    const router = useRouter();
    const ac = useAnimeContext();

    const [response, setResponse] = useState<JikanResponse<MyAnime[]> | null>(null);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        setResponse(null);
        setError(null);
        const loadData = async () => {
            try {
                const sp: AnimeSearchParams = {
                    q, type, page, sfw: true, min_score, limit: 24
                };
                if (!q) {
                    sp.order_by = "score";
                    sp.sort = "desc";
                }
                const response = await searchAnime(sp);
                response.data.forEach(a => a.saved = ac.myAnimes.find(s => s.mal_id === a.mal_id)?.saved ?? false);
                setResponse(response);
            } catch (err) {
                console.error("Fel! Ingen animedata!", err);
                setError(err);
            }
        };
        //        setTimeout(() => {
        loadData();
        //        }, 3000);
    }, [q, type, page, min_score, ac.myAnimes]);

    const onPrevPage = () => {
        if (page > 1) {
            const params = new URLSearchParams(searchParams);
            const nextPage = page - 1;
            params.set('page', nextPage.toString());
            router.push(`/search?${params.toString()}`);
        }
    };

    const onNextPage = () => {
        const params = new URLSearchParams(searchParams);
        const nextPage = page + 1;
        params.set('page', nextPage.toString());
        router.push(`/search?${params.toString()}`);
    };

    if (error)
        throw error;

    if (!response?.data) {
        return <div className={styles.fallback2}><Clock /></div>;
    }

    return (<>
        <div className={styles.searchresultsctrl}>
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
                className={response.pagination?.has_next_page ? "" : "disabled"}
                disabled={!response.pagination?.has_next_page}
                onClick={onNextPage} >
                Nästa &gt;
            </button>
        </div>
        {ac.showSearchList ?
            <AnimeList animes={response.data} search={true} /> :
            <Cards animes={response.data} search={true} />}
    </>);
}
