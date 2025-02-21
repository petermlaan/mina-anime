"use client";

import React, { useEffect, useState } from "react";
import { Cards } from '../components/cards';
import { MyAnime } from "@/lib/interfaces";
import { getList } from "@/lib/clientutil";
import styles from "./savedanimes.module.css";

export function SavedAnimes() {
    const [animes, setAnimes] = useState<MyAnime[]>([]);

    const onRemoveAnime = (animeId: number) => {
        // This function will be called by the Card component when an anime is removed
        setAnimes(prevAnimes => prevAnimes.filter(anime => anime.mal_id !== animeId));
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getList();
                setAnimes(res);
            } catch (err) {
                console.error("Ingen animedata: " + err);
            }
        };
        loadData();
    }, []);

    return (<>
        <div className={styles.toprow}>
            <label htmlFor="chkFilterWatched">Dölj sedda
                <input type="checkbox" id="chkFilterWatched" />
            </label>
            <label htmlFor="chkShowList">Visa lista
                <input type="checkbox" id="chkShowList" />
            </label>
        </div>
        <Cards animes={animes} search={false} onRemoveAnime={onRemoveAnime} />
    </>);
}
