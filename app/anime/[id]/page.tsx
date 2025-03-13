"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useProductContext } from "@/components/acmecontext";
import { getProduct } from "@/lib/client/clientutil";
import { Product } from "@/lib/interfaces";

export default function AnimePage({ params }: { params: Promise<{ id: number }> }) {
  const router = useRouter();
  const id = +use(params).id;
  const ac = useProductContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setError(null);
    getProduct(id, ac.myProducts).then(res => {
      setProduct({ ...res });
      document.title = res.title + " - Mina Anime";
    }).catch((err) => setError(err));
  }, [id, ac.myProducts]);

  if (error)
    throw error;

  if (!product) {
    return <div>Laddar anime...</div>;
  }

  return (
    <main className="flex flex-col gap-4 bg-(--clr-main1) border border-(--clr-main3) m-4 p-2 md:flex-row">

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 h-8 items-center justify-between">
          <button onClick={router.back}>Stäng</button>
          <input type="number" min="0" value={product.amount} 
            onChange={(e) => ac.changeAmount(product, +e.target.value)} />
        </div>
        <Link href={product.images[0]}>
          <Image
            className="w-60 h-90 object-cover"
            width={240} height={360}
            src={product.images[0]}
            alt={`Bild på ${product.title}`}
            priority />
        </Link>
      </div>

      <div className="flex flex-col gap-2 pr-4">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
      </div>

    </main>
  );
}
