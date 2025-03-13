'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import SuperJSON from 'superjson';
import { getList, saveList } from '@/lib/client/clientutil';
import { Product } from '@/lib/interfaces';

interface ProductContextType {
  myProducts: Product[];
  addProduct: (anime: Product) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  removeProduct: (id: number) => void;
  showSearchList: boolean;
  setShowSearchList: (showList: boolean) => void;
  showSavedList: boolean;
  setShowSavedList: (showList: boolean) => void;
};

interface LS { 
  showSearchList: boolean, 
  showSavedList: boolean, 
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [showSearchList, setStateShowSearchList] = useState(false);
  const [showSavedList, setStateShowSavedList] = useState(false);

  useEffect(() => {
    getList().then((saved) => setMyProducts(saved));
    const ls = localStorage.getItem("Products");
    if (ls) {
      const lso: LS = SuperJSON.parse(ls);
      setStateShowSearchList(lso.showSearchList);
      setStateShowSavedList(lso.showSavedList);
    }
  }, []);

  const setShowSearchList = (showSearchList: boolean) => {
    setStateShowSearchList(showSearchList);
    storeInLS({
      showSearchList,
      showSavedList,
    });
  };

  const setShowSavedList = (showSavedList: boolean) => {
    setStateShowSavedList(showSavedList);
    storeInLS({
      showSearchList,
      showSavedList,
    });
  };

  const storeInLS = (lso: LS) => {
    localStorage.setItem("Products", SuperJSON.stringify(lso));
  }
  
  const addProduct = (product: Product) => {
    if (myProducts.find(p => p.id === product.id))
      return;
    product.saved = true;
    const list = [product, ...myProducts];
    setMyProducts(list)
    saveList(list);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    const list = myProducts.map(product => product.id === id ? { ...product, ...updates } : product);
    setMyProducts(list);
    saveList(list);
  };

  const removeProduct = (id: number) => {
    console.log("removeAnime", id);
    const list = myProducts.filter(product => product.id !== id);
    setMyProducts(list);
    saveList(list);
  };

  return (
    <ProductContext.Provider value={{
      myProducts,
      addProduct, updateProduct, removeProduct,
      showSearchList, setShowSearchList,
      showSavedList, setShowSavedList,
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useAnimeContext must be used within an AnimeProvider');
  }
  return context;
}