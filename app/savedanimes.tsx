"use client";

import React from "react";
import { Cards } from '../components/cards';
import styles from "./savedanimes.module.css";
import { useAnimeContext } from "@/components/animecontext";

export function SavedAnimes() {
    const { myAnimes } = useAnimeContext();

    return (<>
        <div className={styles.toprow}>
            <label htmlFor="chkFilterWatched">Dölj sedda
                <input type="checkbox" id="chkFilterWatched" />
            </label>
            <label htmlFor="chkShowList">Visa lista
                <input type="checkbox" id="chkShowList" />
            </label>
        </div>
        <Cards animes={myAnimes} search={false} />
    </>);
}
