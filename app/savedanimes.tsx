"use client";

import React from "react";
import { Cards } from '../components/cards';
import styles from "./savedanimes.module.css";
import { useAnimeContext } from "@/components/animecontext";
import { AnimeList } from "@/components/animelist";

export function SavedAnimes() {
    const ac = useAnimeContext();

    return (<>
        <div className={styles.toprow}>
            <label htmlFor="chkFilterWatched" className="checkbox">Dölj sedda
                <input 
                type="checkbox" 
                id="chkFilterWatched" 
                checked={ac.hideWatched} 
                onChange={() => ac.setHideWatched(!ac.hideWatched)} />
            </label>
            <label htmlFor="chkShowList" className="checkbox">Visa lista
                <input
                    type="checkbox"
                    id="chkShowList"
                    checked={ac.showSavedList}
                    onChange={() => ac.setShowSavedList(!ac.showSavedList)} />
            </label>
        </div>
        {ac.showSavedList ?
            <AnimeList animes={ac.myAnimes} search={false} /> :
            <Cards animes={ac.myAnimes} search={false} /> }
    </>);
}
