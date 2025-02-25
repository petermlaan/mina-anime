'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { MyAnime } from '@/lib/interfaces';
import { getList, saveList } from '@/lib/client/clientutil';

interface AnimeContextType {
  myAnimes: MyAnime[];
  addAnime: (anime: MyAnime) => void;
  updateAnime: (id: number, updates: Partial<MyAnime>) => void;
  removeAnime: (id: number) => void;
}

const AnimeContext = createContext<AnimeContextType | undefined>(undefined);

export function AnimeProvider({ children }: { children: React.ReactNode }) {
  const [myAnimes, setMyAnimes] = useState<MyAnime[]>([]);
  const loaded = useRef(0);

  useEffect(() => {
    getList().then((saved) =>
      setMyAnimes(saved)
    )
  }, []);

  useEffect(() => {
    if (loaded.current > 1)
      saveList(myAnimes);
    else
      loaded.current++;
  }, [myAnimes]);

  const addAnime = (anime: MyAnime) => {
    console.log("addAnime: ", anime);
    anime.saved = true;
    anime.watched = false;
    anime.myRating = 0;
    const list = [anime, ...myAnimes];
    setMyAnimes(list)
    saveList(list);
  };

  const updateAnime = (id: number, updates: Partial<MyAnime>) => {
    console.log("updateAnime: ", id, updates);
    const list = myAnimes.map(anime => anime.mal_id === id ? { ...anime, ...updates } : anime);
    setMyAnimes(list);
    saveList(list);
  };

  const removeAnime = (id: number) => {
    console.log("removeAnime: ", id);
    const list = myAnimes.filter(anime => anime.mal_id !== id);
    setMyAnimes(list);
    saveList(list);
  };

  return (
    <AnimeContext.Provider value={{ myAnimes, addAnime, updateAnime, removeAnime }}>
      {children}
    </AnimeContext.Provider>
  );
}

export function useAnimeContext() {
  const context = useContext(AnimeContext);
  if (!context) {
    throw new Error('useAnimeContext must be used within an AnimeProvider');
  }
  return context;
}