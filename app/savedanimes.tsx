"use client";

import React, { useEffect, useState } from "react";
import { Cards } from '../components/cards';
import { MyAnime } from "@/lib/interfaces";
import { getAnimesSA } from "@/lib/actions";
import { getListFromLS, saveListToLS } from "@/lib/clientutil";

export function SavedAnimes({ showList }: { showList: boolean }) {
    console.log("SavedAnimes: ", showList);
    const [animes, setAnimes] = useState<MyAnime[]>([]);
    const [errormsg, setErrormsg] = useState<string>("");
    useEffect(() => {
        const loadData = async () => {
            let res: MyAnime[] | null = [];
            try {
                res = await getListFromLS();
                if (res)
                    setAnimes(res);
                else {
                    const list = await getAnimesSA() ?? [];
                    setAnimes(list);
                    saveListToLS(list);
                }
            } catch (err) {
                setErrormsg("Fel! Ingen animedata!" + err);
            }
        };
        loadData();
    }, []);

    if (errormsg)
        return { errormsg };

    return (
        <Cards animes={animes} />
    );
}
