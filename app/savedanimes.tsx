"use client";

import React, { useState } from "react";
import { Cards } from '../components/cards';
import styles from "./savedanimes.module.css";
import { useAnimeContext } from "@/components/animecontext";
import { AnimeList } from "@/components/animelist";

export function SavedAnimes() {
    const { myAnimes } = useAnimeContext();
    const [showList, setShowList] = useState(false);

    return (<>
        <div className={styles.toprow}>
            <label htmlFor="chkFilterWatched" className="checkbox">Dölj sedda
                <input type="checkbox" id="chkFilterWatched" />
            </label>
            <label htmlFor="chkShowList" className="checkbox">Visa lista
                <input
                    type="checkbox"
                    id="chkShowList"
                    checked={showList}
                    onChange={() => setShowList(!showList)} />
            </label>
        </div>
        {showList ?
            <AnimeList animes={myAnimes} search={false} /> :
            <Cards animes={myAnimes} search={false} /> }
    </>);
}
