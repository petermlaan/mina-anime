"use client";
import { Product } from "@/lib/interfaces";
import { useProductContext } from "./acmecontext";
import { useEffect, useState } from "react";

export default function Amount({ product }: { product: Product }) {
    const ac = useProductContext();
    const [prod, setProd] = useState(product);

    useEffect(() => {
        const amount = ac.myProducts.find(p => p.id === product.id)?.amount ?? 0;
        setProd({ ...product, amount: amount });
    }, [product, ac.myProducts])

    return (<div className="flex gap-1">
        <button className="w-4" onClick={() => ac.changeAmount(prod, prod.amount - 1)}>&lt;</button>
        <input className="w-16"
            type="text"
            value={prod.amount}
            onChange={e => ac.changeAmount(prod, +e.target.value)} />
        <button className="w-4" onClick={() => ac.changeAmount(prod, prod.amount + 1)}>&gt;</button>
    </div>);
}