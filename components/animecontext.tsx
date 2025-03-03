'use client';

import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { MyAnime } from '@/lib/interfaces';
import { getList, saveList } from '@/lib/client/clientutil';

interface AnimeContextType {
  myAnimes: MyAnime[];
  addAnime: (anime: MyAnime) => void;
  updateAnime: (id: number, updates: Partial<MyAnime>) => void;
  removeAnime: (id: number) => void;
  showSearchList: boolean;
  setShowSearchList: Dispatch<SetStateAction<boolean>>;
  showSavedList: boolean;
  setShowSavedList: Dispatch<SetStateAction<boolean>>;
  hideWatched: boolean;
  setHideWatched: Dispatch<SetStateAction<boolean>>;
}

const AnimeContext = createContext<AnimeContextType | undefined>(undefined);

export function AnimeProvider({ children }: { children: React.ReactNode }) {
  const [myAnimes, setMyAnimes] = useState<MyAnime[]>([]);
  const [showSearchList, setShowSearchList] = useState(false);
  const [showSavedList, setShowSavedList] = useState(false);
  const [hideWatched, setHideWatched] = useState(false);

  useEffect(() => {
    getList().then((saved) =>
      setMyAnimes(saved)
    )
  }, []);

  const addAnime = (anime: MyAnime) => {
    if (myAnimes.find(a => a.mal_id === anime.mal_id))
      return;
    anime.saved = true;
    const list = [anime, ...myAnimes];
    setMyAnimes(list)
    saveList(list);
  };

  const updateAnime = (id: number, updates: Partial<MyAnime>) => {
    const list = myAnimes.map(anime => anime.mal_id === id ? { ...anime, ...updates } : anime);
    setMyAnimes(list);
    saveList(list);
  };

  const removeAnime = (id: number) => {
    console.log("removeAnime", id);
    const list = myAnimes.filter(anime => anime.mal_id !== id);
    setMyAnimes(list);
    saveList(list);
  };

  return (
    <AnimeContext.Provider value={{
      myAnimes,
      addAnime, updateAnime, removeAnime,
      showSearchList, setShowSearchList,
      showSavedList, setShowSavedList,
      hideWatched, setHideWatched
    }}>
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