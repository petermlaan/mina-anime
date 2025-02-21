"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimeSearchParams, AnimeType, JikanResponse } from '@tutkli/jikan-ts';
import { Cards } from "@/components/cards";
import styles from "./searchresults.module.css";
import { MyAnime } from "@/lib/interfaces";
import { searchAnime } from "@/lib/clientutil";
import Clock from "@/components/clock";

export default function AnimeResults() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') || undefined;
    const type = searchParams.get('type') as AnimeType | undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const min_score = searchParams.get('min_score') ? parseInt(searchParams.get('min_score')!) : 0;

    const router = useRouter();

    const [response, setResponse] = useState<JikanResponse<MyAnime[]> | null>(null);

    let errormsg = "";

    useEffect(() => {
        setResponse(null);
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
                setResponse(response);
            } catch (err) {
                errormsg = "Fel! Ingen animedata!" + err;
            }
        };
        setTimeout(() => {
            loadData();
        }, 3000);
    }, [q, type, page, min_score]);

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

     if (!response?.data) {
        if (errormsg)
            return <div>{errormsg}</div>;
        return <div className={styles.fallback2}><Clock /></div>;
    }

    return (<>
        <div className={styles.searchresults}>
            <button type="button"
                className={page < 2 ? "disabled" : ""}
                disabled={page < 2}
                onClick={onPrevPage} >
                &lt; Föreg
            </button>
            <label id="lblShowList" htmlFor="chkShowList">Visa lista
                <input type="checkbox" id="chkShowList" />
            </label>
            <button type="button"
                className={response?.pagination?.has_next_page ? "" : "disabled"}
                disabled={!response?.pagination?.has_next_page}
                onClick={onNextPage} >
                Nästa &gt;
            </button>
        </div>
        <Cards animes={response?.data ?? []} />
    </>);
}
