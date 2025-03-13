import React, { Suspense } from "react";
import { Metadata } from "next";
import { CartProducts } from "@/app/cart/cartproducts";

export const metadata: Metadata = {
  title: "Mina Anime"
};

export default async function Page() {
  return (
    <main className="grid gap-4">
      <Suspense fallback="Laddar listan...">
        <CartProducts />
      </Suspense>
    </main>
  );
}
