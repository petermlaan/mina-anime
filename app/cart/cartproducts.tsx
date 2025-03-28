"use client";
import React from "react";
import { Cards } from '@/components/cards';
import { ProductList } from "@/components/productlist";
import { useProductContext } from "@/components/acmecontext";

export function CartProducts() {
    const ac = useProductContext();

    return (<>
        <div className="text-xl">Totalt: {ac.myProducts.reduce((a, p) => a += p.amount * p.price, 0).toFixed(2)} kr</div>
        <div className="flex flex-wrap justify-center items-center gap-2">
            <label htmlFor="chkShowList" className="flex gap-1">Visa lista:
                <input
                    type="checkbox" id="chkShowList" checked={ac.showSavedList}
                    onChange={() => ac.setShowSavedList(!ac.showSavedList)} />
            </label>
        </div>
        {ac.showSavedList ?
            <ProductList products={ac.myProducts} /> :
            <Cards products={ac.myProducts} isCart={true} />}
    </>);
}
