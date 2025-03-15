"use client";

import React from "react";
import { Cards } from '@/components/cards';
import { useProductContext } from "@/components/acmecontext";
import { ProductList } from "@/components/productlist";

export function CartProducts() {
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
            <ProductList products={ac.myProducts} search={false} /> :
            <Cards products={ac.myProducts} search={false} />}
    </>);
}
