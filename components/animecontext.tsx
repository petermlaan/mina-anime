'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import SuperJSON from 'superjson'
import { MyAnime } from '@/lib/interfaces'
import { getList, saveList } from '@/lib/client/clientutil'

interface AnimeContextType {
  myAnimes: MyAnime[]
  addAnime: (anime: MyAnime) => void
  updateAnime: (id: number, updates: Partial<MyAnime>) => void
  removeAnime: (id: number) => void
  showSearchList: boolean
  setShowSearchList: (showList: boolean) => void
  showSavedList: boolean
  setShowSavedList: (showList: boolean) => void
  hideWatched: boolean
  setHideWatched: (hideWatched: boolean) => void
}

interface LS { 
  showSearchList: boolean, 
  showSavedList: boolean, 
  hideWatched: boolean 
}

const AnimeContext = createContext<AnimeContextType | undefined>(undefined)

export function AnimeProvider({ children }: { children: React.ReactNode }) {
  const [myAnimes, setMyAnimes] = useState<MyAnime[]>([])
  const [showSearchList, setStateShowSearchList] = useState(false)
  const [showSavedList, setStateShowSavedList] = useState(false)
  const [hideWatched, setStateHideWatched] = useState(false)

  useEffect(() => {
    getList().then((saved) => setMyAnimes(saved))
    const ls = localStorage.getItem("MyAnime")
    if (ls) {
      const lso: LS = SuperJSON.parse(ls)
      setStateShowSearchList(lso.showSearchList)
      setStateShowSavedList(lso.showSavedList)
      setStateHideWatched(lso.hideWatched)
    }
  }, [])

  const setShowSearchList = (showSearchList: boolean) => {
    setStateShowSearchList(showSearchList)
    storeInLS({
      showSearchList,
      showSavedList,
      hideWatched,
    })
  }

  const setShowSavedList = (showSavedList: boolean) => {
    setStateShowSavedList(showSavedList)
    storeInLS({
      showSearchList,
      showSavedList,
      hideWatched,
    })
  }

  const setHideWatched = (hideWatched: boolean) => {
    setStateHideWatched(hideWatched)
    storeInLS({
      showSearchList,
      showSavedList,
      hideWatched,
    })
  }

  const storeInLS = (lso: LS) => {
    localStorage.setItem("MyAnime", SuperJSON.stringify(lso))
  }
  
  const addAnime = (anime: MyAnime) => {
    if (myAnimes.find(a => a.mal_id === anime.mal_id))
      return
    anime.saved = true
    const list = [anime, ...myAnimes]
    setMyAnimes(list)
    saveList(list)
  }

  const updateAnime = (id: number, updates: Partial<MyAnime>) => {
    const list = myAnimes.map(anime => anime.mal_id === id ? { ...anime, ...updates } : anime)
    setMyAnimes(list)
    saveList(list)
  }

  const removeAnime = (id: number) => {
    console.log("removeAnime", id)
    const list = myAnimes.filter(anime => anime.mal_id !== id)
    setMyAnimes(list)
    saveList(list)
  }

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
  )
}

export function useAnimeContext() {
  const context = useContext(AnimeContext)
  if (!context) {
    throw new Error('useAnimeContext must be used within an AnimeProvider')
  }
  return context
}