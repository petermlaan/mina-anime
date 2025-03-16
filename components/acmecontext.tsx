'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import SuperJSON from 'superjson';
import { Product } from '@/lib/interfaces';
import { loadCartSA } from '@/lib/server/actions';
import { saveCart } from '@/lib/client/clientutil';

interface ProductContextType {
  myProducts: Product[];
  changeAmount: (product: Product, amount: number) => void;
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
    loadCartSA().then(list => {
      setMyProducts(list ?? []);
    });
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

  const changeAmount = (product: Product, amount: number) => {
    let list = [...myProducts];
    let cartprod: Product | undefined = undefined;
    if (cartprod = myProducts.find(p => p.id === product.id)) {
      if (amount > 0)
        cartprod.amount = amount; // Change amount
      else
        list = myProducts.filter(p => p.id !== cartprod?.id); // Remove product from cart
    } else if (amount > 0) {
      product.amount = amount;
      list = [product, ...myProducts]; // Add product to cart
    }
    setMyProducts(list);
    saveCart(list);
  };

  return (
    <ProductContext.Provider value={{
      myProducts, changeAmount,
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