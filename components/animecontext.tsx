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
    anime.saved = true;
    anime.watched = false;
    anime.myRating = 0;
    setMyAnimes(prev => [anime, ...prev])
  };

  const updateAnime = (id: number, updates: Partial<MyAnime>) => {
    console.log("updateAnime: ", id, updates);
    setMyAnimes(prev =>
      prev.map(anime => anime.mal_id === id ? { ...anime, ...updates } : anime)
    );
  };
 
  const removeAnime = (id: number) => {
    setMyAnimes(prev => prev.filter(anime => anime.mal_id !== id));
  };

  return (
    <AnimeContext.Provider value={{ myAnimes, addAnime, updateAnime, removeAnime }}>
      {children}
    </AnimeContext.Provider>
  );
}

export function useAnimeContext() {
  const context = useContext(AnimeContext);
  if (context === undefined) {
    throw new Error('useAnimeContext must be used within an AnimeProvider');
  }
  return context;
}