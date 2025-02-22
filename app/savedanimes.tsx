"use client";

import React, { useEffect, useState } from "react";
import { Cards } from '../components/cards';
import { MyAnime } from "@/lib/interfaces";
import { getList } from "@/lib/clientutil";
import styles from "./savedanimes.module.css";

export function SavedAnimes() {
    const [animes, setAnimes] = useState<MyAnime[]>([]);
    const [errmsg, setErrmsg] = useState("");

    const onRemoveAnime = (animeId: number) => {
        // Called by Card when an anime is removed or saved
        setAnimes(prevAnimes => prevAnimes.filter(anime => anime.mal_id !== animeId));
    };

    useEffect(() => {
        getList().then((res) => setAnimes(res))
            .catch(err => {
                console.error("Ingen animedata: ", err);
                setErrmsg("Något gick fel vid inhämtning av din animelista.");
            });
    }, []);

    if (errmsg)
        return {errmsg};

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
