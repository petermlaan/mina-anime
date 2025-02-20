"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimeClient, AnimeSearchParams, AnimeType, JikanResponse } from '@tutkli/jikan-ts';
import { Cards } from "@/components/cards";
import styles from "./page.module.css";
import { MyAnime } from "@/lib/interfaces";

export default function AnimeResults() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [response, setResponse] = useState<JikanResponse<MyAnime[]> | null>(null);
    const [errormsg, setErrormsg] = useState<string>("");

    const q = searchParams.get('q') || undefined;
    const type = searchParams.get('type') as AnimeType | undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const min_score = searchParams.get('min_score') ? parseInt(searchParams.get('min_score')!) : 0;

    useEffect(() => {
        const loadData = async () => {
            try {
                const jikanAPI = new AnimeClient({ enableLogging: false });
                const sp: AnimeSearchParams = {
                    q, type, page, sfw: true, min_score
                };
                if (!q) {
                    sp.order_by = "score";
                    sp.sort = "desc";
                }
                const response = await jikanAPI.getAnimeSearch(sp);
                setResponse(response);
                if (!response) {
                    setErrormsg("Ingen animedata!");
                }
            } catch (err) {
                setErrormsg("Fel! Ingen animedata!" + err);
            }
        };
        loadData();
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
        return <div>Söker...</div>;
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
                className={response.pagination?.has_next_page ? "" : "disabled"}
                disabled={!response.pagination?.has_next_page}
                onClick={onNextPage} >
                Nästa &gt;
            </button>
        </div>
        <Cards animes={response.data} />
    </>);
}
