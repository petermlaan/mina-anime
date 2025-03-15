"use client";
import { Product } from "@/lib/interfaces";
import { useProductContext } from "./acmecontext";
import { useEffect, useState } from "react";

export default function Amount({ product }: {product: Product}) {
    const ac = useProductContext();
    const [prod, setProd] = useState(product);

    useEffect(() => {
        const amount = ac.myProducts.find(p => p.id === product.id)?.amount ?? 0;
        setProd({...product, amount: amount});
    }, [product, ac.myProducts])

    return (
        <input type="number" min="0" value={prod.amount}
            onChange={e => ac.changeAmount(prod, +e.target.value)} />
    );
}