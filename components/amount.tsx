"use client";
import { Product } from "@/lib/interfaces";
import { useProductContext } from "./acmecontext";
import { useEffect, useState } from "react";

export default function Amount({
    product,
    isCart = false
}: {
    product: Product,
    isCart?: boolean
}) {
    const ac = useProductContext();
    const [prod, setProd] = useState(product);

    useEffect(() => {
        const amount = ac.myProducts.find(p => p.id === product.id)?.amount ?? 0;
        setProd({ ...product, amount: amount });
    }, [product, ac.myProducts])

    return (<div className="flex">
        {(prod.amount === 0 && !isCart) ?
            <button onClick={() => ac.changeAmount(prod, 1)}>Lägg till</button>
            : <>
                <button className="w-12 text-xl border" onClick={() => ac.changeAmount(prod, prod.amount - 1)}>-</button>
                <input className="w-12 h-12 border text-center flex-1"
                    type="text"
                    value={prod.amount}
                    onChange={e => ac.changeAmount(prod, +e.target.value)} />
                <button className="w-12 text-xl border" onClick={() => ac.changeAmount(prod, prod.amount + 1)}>+</button>
            </>}
    </div>);
}