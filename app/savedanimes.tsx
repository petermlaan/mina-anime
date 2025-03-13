"use client";

import React from "react";
import { Cards } from '../components/cards';
import { useProductContext } from "@/components/animecontext";
import { AnimeList } from "@/components/animelist";

export function SavedAnimes() {
    const ac = useProductContext();

    return (<>
        <div className="flex flex-wrap justify-center items-center gap-2">
            <label htmlFor="chkShowList" className="checkbox">Visa lista
                <input
                    type="checkbox" id="chkShowList" checked={ac.showSavedList}
                    onChange={() => ac.setShowSavedList(!ac.showSavedList)} />
            </label>
        </div>
        {ac.showSavedList ?
            <AnimeList products={ac.myProducts} search={false} /> :
            <Cards products={ac.myProducts} search={false} />}
    </>);
}
