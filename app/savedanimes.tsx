"use client";

import React, { useEffect, useState } from "react";
import { Cards } from '../components/cards';
import { MyAnime } from "@/lib/interfaces";
import { getList } from "@/lib/clientutil";
import styles from "./savedanimes.module.css";

export function SavedAnimes({ showList }: { showList: boolean }) {
    console.log("SavedAnimes: ", showList);
    const [animes, setAnimes] = useState<MyAnime[]>([]);
    const [errormsg, setErrormsg] = useState<string>("");
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getList();
                setAnimes(res);
            } catch (err) {
                setErrormsg("Fel! Ingen animedata!" + err);
            }
        };
        loadData();
    }, []);

    if (errormsg)
        return errormsg;

    return (<>
        <div className={styles.toprow}>
            <label htmlFor="chkFilterWatched">Dölj sedda
                <input type="checkbox" id="chkFilterWatched" />
            </label>
            <label htmlFor="chkShowList">Visa lista
                <input type="checkbox" id="chkShowList" />
            </label>
        </div>
        <Cards animes={animes} />
    </>);
}
